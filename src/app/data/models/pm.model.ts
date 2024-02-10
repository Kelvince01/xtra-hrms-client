import {IBaseModel} from '@models/base.model';

export interface IProject extends IBaseModel {
  subProjectIds?: any;
  image?: string;
  name?: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  progress?: number;
  price?: number;
  picture?: Blob;
  thumbnail?: Blob;
  category_id?: number;
  employee_id?: number;
  status?: string;
  tax_type_id?: number;

  employee?: number;
  job_no?: string;
  shop_out?: Date;
  shop_in?: Date;
  completion?: Date;
  installation_date?: Date;
  assigned_to?: number;
  active?: boolean;
  approved?: boolean;
  authorized_members?: number;
  badge_image?: string;
  contact_email?: string;
  id_label?: string;
  info_url?: string;
  is_academic_or_nonprofit?: boolean;
  is_study?: boolean;
  leader?: string;
  long_description?: string;
  organization?: string;
  request_message_permission?: boolean;
  request_sources_access?: string;
  request_username_access?: boolean;
  returned_data_description?: string;
  short_description?: string;
  slug?: string;
  type?: string;
  token?: string;
}

export interface ITask extends IBaseModel {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  assigned_at?: Date;
  deadline_at?: Date;
  board?: number;
  project?: number;
  organization?: number;
  assignee?: number;
  done?: boolean;
}

export interface ITaskAssigment extends IBaseModel {
  employee?: number;
  task?: number;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  status?: string;
}
