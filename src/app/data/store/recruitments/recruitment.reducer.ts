import {IRecruitment} from '@models/recruitments.model';
import {createFeature, createReducer, on} from '@ngrx/store';
import {recruitmentListActions} from '@stores/recruitments/recruitment.action';

export interface RecruitmentListState {
  listConfig: RecruitmentListConfig;
  recruitments: Recruitments;
}

export interface RecruitmentListConfig {
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

export interface Recruitments {
  entities: IRecruitment[];
  recruitmentsCount: number;
  loaded: boolean;
  loading: boolean;
}

export const recruitmentListInitialState: RecruitmentListState = {
  listConfig: {
    type: 'ALL',
    currentPage: 1,
    filters: {
      limit: 10,
    },
  },
  recruitments: {
    entities: [],
    recruitmentsCount: 0,
    loaded: false,
    loading: false,
  },
};

export const recruitmentListFeature = createFeature({
  name: 'recruitmentsList',
  reducer: createReducer(
    recruitmentListInitialState,
    on(recruitmentListActions.setListPage, (state, {page}) => {
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
    on(recruitmentListActions.setListConfig, (state, {config}) => ({
      ...state,
      listConfig: config,
    })),
    on(recruitmentListActions.loadRecruitments, (state) => {
      const recruitments = {...state.recruitments, loading: true};
      return {...state, recruitments};
    }),
    on(recruitmentListActions.loadRecruitmentsSuccess, (state, action) => {
      const recruitments = {
        ...state.recruitments,
        entities: action.recruitments,
        recruitmentsCount: action.recruitmentsCount,
        loading: false,
        loaded: true,
      };
      return {...state, recruitments};
    }),
    on(recruitmentListActions.loadRecruitmentsFailure, (state, _) => {
      const recruitments = {
        ...state.recruitments,
        entities: [],
        recruitmentsCount: 0,
        loading: false,
        loaded: true,
      };
      return {...state, recruitments};
    }),
  ),
});

export function replaceRecruitment(
  recruitments: Recruitments,
  payload: IRecruitment,
): Recruitments {
  const recruitmentIndex = recruitments.entities.findIndex((a) => a.id === payload.id);
  const entities = [
    ...recruitments.entities.slice(0, recruitmentIndex),
    Object.assign({}, recruitments.entities[recruitmentIndex], payload),
    ...recruitments.entities.slice(recruitmentIndex + 1),
  ];
  return {...recruitments, entities, loading: false, loaded: true};
}
