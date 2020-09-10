import { ApplicantState } from '../reducers/applicant.reducers';
import { createSelector } from '@ngrx/store';
import { selectAll, selectEntities, getApplicantEditId } from '../reducers/applicant.reducers';
import { getApplicantsState, getRouterState } from '../reducers/index';


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
  state => state.state
);

export const selectEditApplicantId = createSelector(
  getApplicantState,
  getApplicantEditId
)

export const selectApplicantEntities = createSelector(
  getApplicantState,
  selectEntities
);

export const getCurrentApplicant = createSelector(
  selectApplicantEntities,
  selectEditApplicantId,
  (entities, applicantId) => entities[applicantId]
);