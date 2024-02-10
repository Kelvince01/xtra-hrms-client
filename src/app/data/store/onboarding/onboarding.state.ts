import {IOnboardingStage} from '@data/models/onboarding.model';

export interface OnboardingStageState {
  error: string;
  isLoading: boolean;
  onboardingStage: IOnboardingStage;
}

export const initialOnboardingStageValue: IOnboardingStage = {};

export const onboardingStageInitialState: OnboardingStageState = {
  error: '',
  isLoading: false,
  onboardingStage: initialOnboardingStageValue,
};
