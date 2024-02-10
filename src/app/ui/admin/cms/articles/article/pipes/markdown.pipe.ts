import {Pipe, PipeTransform} from '@angular/core';
import {marked} from 'marked';

@Pipe({
  name: 'markdown',
  standalone: true,
})
export class MarkdownPipe implements PipeTransform {
  async transform(content: string): Promise<string> {
    return await marked(content, {
      async: true,
      // sanitize: true
    });
  }
}
