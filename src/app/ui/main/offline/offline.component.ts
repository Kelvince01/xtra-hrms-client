import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { animateConditional } from '../../../animations';

@Component({
  selector: 'xtra-offline',
  standalone: true,
  imports: [NgOptimizedImage],
  animations: [animateConditional],
  template: `
    <div style="position:relative; height:100%; width:100%;">
      <div style="margin-left:40px; margin-top:30px;">
        @if (showImage) {
          <img
            [@inOutAnimation]="animateConditional"
            ngSrc="assets/images/logo_gmail_lockup_default_1x_r4.png"
            srcset="assets/images/logo_gmail_lockup_default_2x_r4.png"
            id="product-logo"
            border="0"
            height="40"
            alt="Gmail"
            vspace="10" />
        }
      </div>
      <div
        tabindex="-1"
        style="margin:0; position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); outline:none; text-align:center;">
        <div style="display:block; margin-left:auto; margin-right:auto; width:200px; height:200px;">
          <img
            alt="No connection found."
            height="200px"
            id="no-connection"
            ngSrc="./../../../../assets/images/default_400.png"
            srcset="./../../../../assets/images/default_800.png"
            width="200px" />
        </div>
        <div style="padding-top:20px;" dir="auto">
          <span class="maintextFont">You appear to be offline</span>
        </div>
        <div style="padding-top:8px;" dir="auto">
          <span class="subtextFont">
            You can't use Gmail until you're connected to the internet
          </span>
        </div>
        <div style="padding-top:20px; display:flex; justify-content:center;" dir="auto">
          <div role="button" id="retry-btn" class="retryBtn" tabindex="0">
            <span>Retry</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      @import url(//fonts.googleapis.com/css?family=Google+Sans);

      body {
        background: #ffffff;
      }

      .retryBtn {
        align-items: center;
        background: #1a73e8;
        border-radius: 4px;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        flex: none;
        flex-direction: column;
        flex-grow: 0;
        font-family: 'Google Sans', Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.25px;
        line-height: 20px;
        order: 0;
        padding: 8px 24px;
        justify-content: center;
        text-align: center;
      }

      .maintextFont {
        align-items: center;
        color: #202124;
        font-family: 'Google Sans', Arial, sans-serif;
        font-size: 22px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 28px;
      }

      .subtextFont {
        align-items: center;
        color: #5f6368;
        font-family: 'Montserrat', san-serif;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.2px;
        line-height: 20px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfflineComponent {
  showImage = true;
  protected readonly animateConditional = animateConditional;
}
