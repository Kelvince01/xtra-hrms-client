export interface BaseModel {
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
