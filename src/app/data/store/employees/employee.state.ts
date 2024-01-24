import {EmployeeModel} from "../../models/employee.model";

export interface EmployeeState {
  employee: EmployeeModel;
  employees?: EmployeeModel[];
}
