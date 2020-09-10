import { ApplicantState } from '../reducers/applicant.reducers';
import { createSelector } from '@ngrx/store';
import { selectAll } from '../reducers/applicant.reducers';
import { getApplicantsState, getRouterState } from '../reducers/index'
import { RouterReducerState } from '@ngrx/router-store';


export const getApplicantState = createSelector(
  getApplicantsState,
  (state: ApplicantState) => state
);

export const getAllApplicants = createSelector(
  getApplicantState,
  selectAll
);

export const fetchApplicantOnEdit = createSelector(
    getApplicantState,
    state => state.applicantOnEdit
);

export const getCurrentRouteState = createSelector(
  getRouterState,
  (state: RouterReducerState) => state.state
);