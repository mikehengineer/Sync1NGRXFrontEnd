import { ApplicantState } from '../reducers/applicant.reducers';
import { createSelector } from '@ngrx/store';
import { selectAll } from '../reducers/applicant.reducers';
import { getApplicantsState } from '../reducers/index'


export const getApplicantState = createSelector(
  getApplicantsState,
  state => state.applicantState
);

export const getAllApplicants = createSelector(
  getApplicantState,
  selectAll
);

export const fetchApplicantOnEdit = createSelector(
    getApplicantState,
    state => state.applicantOnEdit
);