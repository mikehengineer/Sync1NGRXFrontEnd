import { ApplicantState } from '../reducers/applicant.reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { selectAll } from '../reducers/applicant.reducers';
import { AppState } from '../reducers/app.state';

export const applicantFeatureSelector = createFeatureSelector<ApplicantState>('applicants');

export const getAllApplicants = createSelector(
  applicantFeatureSelector,
  selectAll
);

export const fetchApplicantOnEdit = createSelector(
    applicantFeatureSelector,
    state => state.applicantOnEdit
);