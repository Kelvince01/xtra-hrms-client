import { ImageLoaderConfig } from '@angular/common';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { TruncateLimit } from '@shared/directives/truncate.directive';

/**
 * Provides base providers
 * @description this is a factory function
 * @see MAT_SNACK_BAR_DEFAULT_OPTIONS
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const provideBaseProviders = () => {
  return [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500 } },
    { provide: TruncateLimit, useValue: 70 },
  ];
};

export const imageLoader = (config: ImageLoaderConfig) => {
  return config.loaderParams;
};
