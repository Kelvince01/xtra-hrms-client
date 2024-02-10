import {IBaseModel} from '@models/base.model';

export interface ICurrency extends IBaseModel {
  name?: string;
  code: string;
  cost: string;

  symbol?: string;
  rate?: number;
  is_home?: boolean;
  forward?: boolean;
  as_at_date?: Date;
  average_rate?: number;
  end_date?: Date;
}

export interface ITag {
  name: string;
  slug: string;
}

export interface IStatus {
  name: string;
}

export interface ICountry extends IBaseModel {
  name: string;
  code: string;
}

export interface ICounty extends IBaseModel {
  country_id: number;
  name: string;
  code: string;
}

export interface ICity {
  county_id: number;
  name: string;
  code: string;
}

export interface ICounty extends IBaseModel {
  title: string;
  description: string;
  status: string;
}

export interface IAddress extends IBaseModel {
  address_line: number;
  address_line_2?: number;
  building_details?: string;
  road?: string;
  street?: string;
  landmark?: string;
  town: string;
  county: string;
  country: string;
  postal_code: number;
  location?: string;
  district?: string;
  division?: string;
  sub_county?: string;
  parish?: string;
  village?: string;
  telephone?: string;
}

export interface I_Address extends IBaseModel {
  street: string | null;
  street2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  verified?: boolean;
}

export interface ILocation extends IBaseModel {
  address_line_1?: string;
  address_line_2?: string;
  postal_code?: number;
  estate?: string;
  building?: string;
  street?: string;
  town?: string;
  city?: string;
  region?: string;
  state?: string;
  lng?: number;
  lat?: number;
  has_petrol_station?: boolean;
  country?: number;
}

export interface IMessage extends IBaseModel {
  text?: string;
  user?: number;
}

export interface IContact extends IBaseModel {
  phone_no: string;
  email: string;
  official_email: string;
  personal_email: string;
  address: number;
  mobile_phone_no: string;
  office_phone_no: string;
  salutation: string;
  firstname: string;
  lastname: string;
  organization: string;
  title: string;
  language: string;
  do_not_call: boolean;
  description: string;
  is_active: boolean;
  linkedin: string;
  twitter: string;
  facebook_url: string;
}

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
}
interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
  id: string;

  /** Federal Employer Identification Number */
  fein?: string;
  legalName?: string;
  workAddress: I_Address;
}
