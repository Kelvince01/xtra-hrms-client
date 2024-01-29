import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {EmployeeModel} from '@data/models';
import {IHrDetail} from '@data/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService extends BaseService<EmployeeModel> {
  protected collectionName: string = 'employees';
}

@Injectable()
export class HrDetailsService extends BaseService<IHrDetail> {
  override collectionName: string = 'hr-details';
}
