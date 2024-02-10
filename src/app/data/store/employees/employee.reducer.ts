import {createFeature, createReducer, on} from '@ngrx/store';
import {EmployeeModel} from '@data/models';
import {employeeListActions, employeesActions} from './employee.action';

export const employeeListFeatureKey = 'employees-list';

export interface EmployeeListState {
  listConfig: EmployeeListConfig;
  employees: Employees;
}

export interface EmployeeListConfig {
  type: ListType;
  currentPage: number;
  filters: Filters;
}

export interface Filters {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}

export type ListType = 'ALL' | 'FEED';

export interface Employees {
  entities: EmployeeModel[];
  employeesCount: number;
  loaded: boolean;
  loading: boolean;
}

export const employeeListInitialState: EmployeeListState = {
  listConfig: {
    type: 'ALL',
    currentPage: 1,
    filters: {
      limit: 10,
    },
  },
  employees: {
    entities: [],
    employeesCount: 0,
    loaded: false,
    loading: false,
  },
};

export const employeeListFeature = createFeature({
  name: 'employeesList',
  reducer: createReducer(
    employeeListInitialState,
    on(employeeListActions.setListPage, (state, {page}) => {
      const filters = {
        ...state.listConfig.filters,
        offset: (state?.listConfig?.filters?.limit ?? 10) * (page - 1),
      };
      const listConfig = {
        ...state.listConfig,
        currentPage: page,
        filters,
      };
      return {...state, listConfig};
    }),
    on(employeeListActions.setListConfig, (state, {config}) => ({
      ...state,
      listConfig: config,
    })),
    on(employeeListActions.loadEmployees, (state) => {
      const employees = {...state.employees, loading: true};
      return {...state, employees};
    }),
    on(employeeListActions.loadEmployeesSuccess, (state, action) => {
      const employees = {
        ...state.employees,
        entities: action.employees,
        employeesCount: action.employeesCount,
        loading: false,
        loaded: true,
      };
      return {...state, employees};
    }),
    on(employeeListActions.loadEmployeesFailure, (state, _) => {
      const employees = {
        ...state.employees,
        entities: [],
        employeesCount: 0,
        loading: false,
        loaded: true,
      };
      return {...state, employees};
    }),
    on(
      employeesActions.unfavoriteSuccess,
      employeesActions.favoriteSuccess,
      (state, {employee}) => ({
        ...state,
        employees: replaceEmployee(state.employees, employee),
      }),
    ),
  ),
});

function replaceEmployee(employees: Employees, payload: EmployeeModel): Employees {
  const employeeIndex = employees.entities.findIndex((a) => a.id === payload.id);
  const entities = [
    ...employees.entities.slice(0, employeeIndex),
    Object.assign({}, employees.entities[employeeIndex], payload),
    ...employees.entities.slice(employeeIndex + 1),
  ];
  return {...employees, entities, loading: false, loaded: true};
}
