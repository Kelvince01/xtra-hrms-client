import { createSelector } from '@ngrx/store';
import { employeeListFeature } from './employee.reducer';

const { selectEmployeesListState, selectEmployees, selectListConfig } = employeeListFeature;
export const selectEmployeeEntities = createSelector(
  selectEmployees,
  employees => employees.entities,
);
export const selectEmployeesCount = createSelector(
  selectEmployees,
  employees => employees.employeesCount,
);
export const isLoading = createSelector(selectEmployees, employees => employees.loading);
export const selectTotalPages = createSelector(
  selectEmployeesCount,
  selectListConfig,
  (employeesCount, config) => {
    return Array.from(
      new Array(Math.ceil(employeesCount / (config?.filters?.limit ?? 1))),
      (val, index) => index + 1,
    );
  },
);

export const employeeListQuery = {
  selectEmployeesListState,
  selectEmployees,
  selectEmployeeEntities,
  selectListConfig,
  selectEmployeesCount,
  isLoading,
  selectTotalPages,
};
