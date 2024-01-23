import {BaseModel} from "./base.model";

export interface EmployeeModel extends BaseModel {
  firstname: string;
  surname: string;
  date_of_birth: Date;
  gender: string;
  marital_status: string;
}

export interface NewEmployeeModel {
  firstname: string;
  surname: string;
  date_of_birth: Date;
  gender: string;
  marital_status: string;
}

export interface UpdateEmployeeModel extends BaseModel {
  firstname: string;
  surname: string;
  date_of_birth: Date;
  gender: string;
  marital_status: string;
}
