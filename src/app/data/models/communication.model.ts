import {BaseModel} from '@models/base.model';

export interface ISms extends BaseModel {
  mobile_no?: string;
  message?: string;
  sent_date?: Date;
  delivered?: boolean;
}

export interface IEmailSetting extends BaseModel {
  name?: string;
  group?: string;
  subject?: string;
  sender_email?: string;
  username?: string;
  password?: string;
  outgoing_server?: string;
  max_per_hour?: number;
}

export interface IEmail extends BaseModel {
  to?: string;
  email_id?: number;
  client?: number;
  name_id?: number;
  table_name?: string;
  to_address?: string;
  cc_address?: string;
  bc_address?: string;
  priority?: string;
  attached_file?: string;
  from_address?: string;
  date_sent?: Date;
  organization?: number;

  html?: string;
  plainText?: string;
  date?: number;
  from?: string;

  from_account?: number;
  recipients?: number[];
  to_email?: string;
  subject?: string;
  body?: string;
  timezone?: string;
  scheduled_date_time?: Date;
  scheduled_later?: boolean;
  created_on?: Date;
  from_email?: string;
  rendered_message_body?: string;
  file?: any;
  send_time?: Date;
  status?: string;
  important?: boolean;
  pinned?: boolean;
  trash?: boolean;
  draft?: boolean;
}

export interface ChatContent {
  agent: 'user' | 'chatbot';
  message: string;
  loading?: boolean;
}
