import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { ApplicantState, applicantReducer } from '../reducers/applicant.reducers';

interface AppState {
    applicantState: ApplicantState;
    //insert future store states here
}

export const Reducers: ActionReducerMap<AppState> = {
    applicantState: applicantReducer
  }

  export const getApplicantsState = createFeatureSelector<AppState>(
    'appstate'
  );