import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {EmployeeModel} from "../models/employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends BaseService<EmployeeModel> {
  protected collectionName: string = 'employees';
}