import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Type, inject} from '@angular/core';
import {SimpleDialogComponent} from '@shared/components';

export interface ConfirmableDecoratorOptions {
  title?: string;
  text?: string;
}

export function Confirmable() {
  return (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const config: ConfirmableDecoratorOptions = {
      title: 'Confirmation needed',
      text: 'Are you sure?',
    };

    descriptor.value = async function (...args: any[]) {
      // const dialog: MatDialog = INJECTOR.get<MatDialog>(MatDialog as Type<MatDialog>);
      const dialog: MatDialog = inject<MatDialog>(MatDialog as Type<MatDialog>);
      const dialogRef: MatDialogRef<SimpleDialogComponent> = dialog.open(SimpleDialogComponent, {
        data: {
          title: config.title,
          text: config.text,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          return originalMethod.apply(this, args);
        }
      });
    };
    return descriptor;
  };
}
