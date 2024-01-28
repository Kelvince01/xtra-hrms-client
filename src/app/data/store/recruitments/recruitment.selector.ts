import {createSelector} from '@ngrx/store';
import {recruitmentListFeature} from './recruitment.reducer';

const {selectRecruitmentsListState, selectRecruitments, selectListConfig} = recruitmentListFeature;
export const selectRecruitmentEntities = createSelector(
  selectRecruitments,
  (recruitments) => recruitments.entities,
);
export const selectRecruitmentsCount = createSelector(
  selectRecruitments,
  (recruitments) => recruitments.recruitmentsCount,
);
export const isLoading = createSelector(selectRecruitments, (recruitments) => recruitments.loading);
export const selectTotalPages = createSelector(
  selectRecruitmentsCount,
  selectListConfig,
  (recruitmentsCount, config) => {
    return Array.from(
      new Array(Math.ceil(recruitmentsCount / (config?.filters?.limit ?? 1))),
      (val, index) => index + 1,
    );
  },
);

export const recruitmentListQuery = {
  selectRecruitmentsListState,
  selectRecruitments,
  selectRecruitmentEntities,
  selectListConfig,
  selectRecruitmentsCount,
  isLoading,
  selectTotalPages,
};
