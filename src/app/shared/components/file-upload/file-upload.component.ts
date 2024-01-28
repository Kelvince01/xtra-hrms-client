import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'xtra-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="file-upload">
      <label for="upload">{{ label }}</label>
      <input type="file" id="upload" (change)="onFileSelected($event)" />
      <span class="error" *ngIf="errorMessage">
        {{ errorMessage }}
        Only following file types are permitted:
        <ul>
          <li *ngFor="let type of accept">{{ type }}</li>
        </ul>
      </span>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @Input({required: true}) label!: string;
  @Input({transform: (value: string) => value.split(',')})
  accept: string[] = [];
  @Output() selected = new EventEmitter<FileList>();
  errorMessage = '';

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.errorMessage = Array.from(files).every((f) => this.accept.includes(f.type))
      ? ''
      : 'Invalid file type';

    if (this.errorMessage === '') {
      this.selected.emit(files);
    }
  }
}