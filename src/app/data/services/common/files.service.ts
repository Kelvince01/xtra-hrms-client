import {inject, Injectable} from '@angular/core';
import JSZip from 'jszip';
import {HttpClient} from '@angular/common/http';
import FileSaver, {saveAs} from 'file-saver';
import autoTable from 'jspdf-autotable';

class Photo {
  public folderName: string = '';
  public fileName: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  downloadProcessing: boolean = false;
  files: Photo[] = [];

  pdfMake: any;
  jsPdf: any;
  html2Canvas: any;
  http = inject(HttpClient);
  // afs = inject(AngularFirestore);
  // afStorage = inject(AngularFireStorage);

  constructor() {}

  async loadPdfMaker(): Promise<void> {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }

  async loadJsPdf(): Promise<void> {
    if (!this.jsPdf) {
      const jsPdfModule = await import('jspdf');
      this.jsPdf = jsPdfModule.default;
    }
  }

  async loadHtml2Canvas(): Promise<void> {
    if (!this.html2Canvas) {
      const html2CanvasModule = await import('html2canvas');
      this.html2Canvas = html2CanvasModule.default;
    }
  }

  async generatePdf(): Promise<void> {
    await this.loadPdfMaker();

    const def = {
      content: 'A sample PDF document generated using Angular and PDFMake',
    };
    this.pdfMake.createPdf(def).open();
  }

  async createPdf(docDefinition: any): Promise<void> {
    await this.loadPdfMaker();

    return this.pdfMake.createPdf(docDefinition);
  }

  async openPdf(DATA: any, filename: string): Promise<void> {
    await this.loadHtml2Canvas();
    await this.loadJsPdf();

    this.html2Canvas(DATA).then((canvas: any) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new this.jsPdf('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`${filename}.pdf`);
    });
  }

  async exportPdf(exportColumns: any, items: any, filename: string): Promise<void> {
    await this.loadJsPdf();

    const doc = new this.jsPdf('p', 'pt');
    autoTable(doc, {
      columns: exportColumns,
      body: items,
      didDrawPage: (dataArg) => {
        doc.text(
          filename,
          dataArg.settings.margin.left,
          dataArg.settings.margin.top,
          dataArg.settings.margin.bottom,
          10,
        );
      },
    });
    doc.save(`${filename}.pdf`);
  }

  public downloadExcel(data: any): void {
    const url: string = '[api endpoint here ]';
    this.http
      .post(url, data.body, {responseType: 'blob'})
      .subscribe((response: Blob) => saveAs(response, `${data.fileName}.xlsx`));
  }

  exportExcel(items: any, filename: string): void {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(items);
      const workbook = {Sheets: {data: worksheet}, SheetNames: ['data']};
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, `${filename}`);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`);
  }

  async downloadZip(filename: string): Promise<void> {
    this.downloadProcessing = true;
    const zip = new JSZip();
    const name = `${filename}.zip`;

    const filePromises = this.files.map(async (file) => {
      const filePath = `${file.folderName}/${file.fileName}`;
      // const url = await firstValueFrom(this.afStorage.ref(filePath).getDownloadURL());
      // const fileData: Blob = await firstValueFrom(this.httpClient.get(url, { responseType: 'blob' }));
      // return { fileName: file.fileName, data: fileData };
    });

    const filesWithData = await Promise.all(filePromises);

    filesWithData.forEach((file: any) => {
      zip.file(file.fileName, file.data, {binary: true});
    });

    zip
      .generateAsync({type: 'blob'})
      .then((content) => {
        if (content) {
          saveAs(content, name);
        }
      })
      .then(() => (this.downloadProcessing = false));
  }
}
