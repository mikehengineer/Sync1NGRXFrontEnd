import { Applicant } from '../models/applicant.model'
import { createAction, props } from '@ngrx/store';

export const loadApplicants = createAction('[Applicant/API] Begin Applicant Load');
export const applicantsLoaded = createAction('[Applicant/API] Applicants Loaded', props<{ applicants: Applicant[] }>());
export const addApplicant = createAction('[Applicant/API] Add Applicant', props<{ applicant: Applicant }>());
export const applicantAdded = createAction('[Applicant/API] Applicant Added', props<{ applicant: Applicant }>());
export const deleteApplicant = createAction('[Applicant/API] Delete Applicant', props<{ applicant: Applicant }>());
export const updateApplicant = createAction('[Applicant/API] Update Applicant', props<{ update: Applicant }>());
export const clearUpdateApplicant = createAction('[Applicant/API] Clear Update Applicant', props<{ null }>());
export const loadEditedApplicant = createAction('[Applicant/API] Load Applicant For Edit', props<{applicant: Applicant }>());

export const applicantActionTypes = {
    loadApplicants,
    applicantsLoaded,
    addApplicant,
    applicantAdded,
    deleteApplicant,
    updateApplicant,
    loadEditedApplicant,
    clearUpdateApplicant
  };