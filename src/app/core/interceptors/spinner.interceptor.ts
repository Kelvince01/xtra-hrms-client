import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject, Renderer2, RendererFactory2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs';

export function spinnerInterceptor(): HttpInterceptorFn {
  return (req, next) => {
    const spinner = inject(NgxSpinnerService);
    const rendererFactory = inject(RendererFactory2);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const renderer: Renderer2 = rendererFactory.createRenderer(null, null);

    const onEnd = (): void => {
      hideLoader();
    };

    const showLoader = (): void => {
      spinner.show();
    };

    const hideLoader = (): void => {
      spinner.hide();
    };

    // return next(req);
    showLoader();
    return next(req).pipe(
      tap(
        async (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            onEnd();
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (err: any) => {
          onEnd();
        },
      ),
    );
  };
}
