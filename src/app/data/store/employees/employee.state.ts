import {EmployeeModel} from "../../models/employee.model";

export interface EmployeeState {
  data: EmployeeModel;
  datas?: EmployeeModel[];
}
