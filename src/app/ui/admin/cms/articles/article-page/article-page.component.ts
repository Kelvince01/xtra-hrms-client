import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'xtra-article-page',
  standalone: true,
  imports: [],
  template: `
    <p>
      article-page works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlePageComponent {

}
