import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'xtra-title',
  standalone: true,
  imports: [NgClass],
  template: `
    <div id="header">
      @if (no) {
        <h1 class="mat-display-1" id="no">{{ no }}</h1>
      }
      <div [ngClass]="{'centered-section': centerText}">
        <h1 class="mat-display-2">{{ title }}</h1>
        <p id="subheading">{{ subtitle }}</p>
      </div>
    </div>
  `,
  styles: `
      h1 {
        margin-bottom: 0 !important;
      }

      #header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin: 0 0 3em 1rem;
      }

      #subheading {
        color: gray;
      }

      #no {
        display: flex;
        align-items: center;
        justify-content: center;
        background: black;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        color: white;
        padding: 12px;
        margin-right: 15px !important;
        text-align: center;
      }

      .centered-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      @media only screen and (min-width: 350px) {
        #header {
          margin-left: 0;
        }
      }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() no?: string;
  @Input() centerText?: boolean = false;
}
