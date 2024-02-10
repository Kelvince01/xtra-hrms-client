import {inject, Injectable} from '@angular/core';
import {NotificationService} from './notification.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MobileNotificationService implements NotificationService {
  toastr = inject(ToastrService);

  showError(message?: string, title?: string): void {
    this.toastr.error(title || message || 'Error');
  }

  showSuccess(message?: string, title?: string): void {
    this.toastr.success(title || message || 'Success');
  }
}
