/*
 * Copyright (c) 2024. Kelvince Phillips.
 *  Terms and Conditions Apply.
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DesktopCameraService} from './desktop-camera.service';

export function cameraFactory(desktopCameraService: DesktopCameraService): CameraService {
  return desktopCameraService;
}

@Injectable({
  providedIn: 'root',
  useFactory: cameraFactory,
  deps: [DesktopCameraService],
})
export abstract class CameraService {
  abstract getPhoto(): Observable<{
    formData: FormData;
    fileName: string;
    base64: string;
  }>;
}
