export interface IBaseModel {
  id?: number;
  is_active?: boolean;
  is_deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by?: number;
  updated_by?: number;
  deleted_by?: number;
}

export interface GenericErrorModel {
  errors: Errors;
}

export interface Errors {
  body: string[];
}
