import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Applicant } from '../models/applicant.model'
import * as applicantActions from '../actions/applicant.actions'

export interface ApplicantState extends EntityState<Applicant> {
    applicantOnEdit: Applicant;
}
 
export const adapter: EntityAdapter<Applicant> = createEntityAdapter<Applicant>();
 
export const initialState: ApplicantState = adapter.getInitialState({
    applicantOnEdit: null
});

export const _applicantReducer = createReducer(
    initialState,
    on(applicantActions.addApplicant, (state, action) => {
      return adapter.addOne(action.applicant, state)
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
    on(applicantActions.clearUpdateApplicant, (state, action) => {
        return {...state, applicantOnEdit: null}
    })
  );

  export const { selectAll, selectIds, } = adapter.getSelectors();