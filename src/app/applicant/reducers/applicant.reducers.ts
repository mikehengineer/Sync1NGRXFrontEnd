import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Applicant } from '../models/applicant.model'
import * as applicantActions from '../actions/applicant.actions'

export interface ApplicantState extends EntityState<Applicant> {
    applicantEditId: number | null;
    applicantOnEdit: Applicant;
}
 
export const adapter: EntityAdapter<Applicant> = createEntityAdapter<Applicant>();
 
export const initialState: ApplicantState = adapter.getInitialState({
    applicantEditId: null,
    applicantOnEdit: null
});

export const applicantReducer = createReducer(
    initialState,
    on(applicantActions.applicantAdded, (state, action) => {
      return adapter.addOne(action.applicant, state)
    }),
    on(applicantActions.updateApplicant, (state, action) => {
      return adapter.setOne(action.update, state)
    }),
    on(applicantActions.applicantsLoaded, (state, action) => {
      return adapter.setAll(action.applicants, state)
    }),
    on(applicantActions.deleteApplicant, (state, action) => {
      return adapter.removeOne(action.applicant.id, state)
    }),
    on(applicantActions.loadEditedApplicant, (state, action) => {
        return {...state, applicantOnEdit:action.applicant}
    }),
    on(applicantActions.clearUpdateApplicant, (state) => {
        return {...state, applicantOnEdit: null}
    }),
    on(applicantActions.setEditedApplicantId, (state, action) => {
        return {...state, applicantEditId: action.applicantId}
    })
  );

  export const getApplicantEditId = (state: ApplicantState) => state.applicantEditId;
  export const { selectAll, selectIds, selectEntities } = adapter.getSelectors();