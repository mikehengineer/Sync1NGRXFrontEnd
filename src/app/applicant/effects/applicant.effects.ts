import { Injectable } from '@angular/core'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { map, concatMap } from 'rxjs/operators'
import { ApplicantAPIService } from '../services/applicantAPI.service'
import * as ApplicantActions from '../actions/applicant.actions'

@Injectable()
export class ApplicantEffects {

  constructor(
    private actions: Actions,
    private applicantService: ApplicantAPIService
  ) {}      

  loadApplicants = createEffect(() => 
    this.actions.pipe(
          ofType(ApplicantActions.loadApplicants),
          concatMap(() => this.applicantService.getAll()),
          map(applicants => ApplicantActions.applicantsLoaded({applicants}))
          )
  ); 

  loadEditApplicant = createEffect(() =>
    this.actions.pipe(
          ofType(ApplicantActions.loadEditedApplicant),
          concatMap((action) => this.applicantService.getApplicantById(action.applicantId)),
          map(applicant => ApplicantActions.editedApplicantLoaded({applicant}))
          )
  );
          
  addApplicant = createEffect(() => 
    this.actions.pipe(
          ofType(ApplicantActions.addApplicant),
          concatMap((action) => this.applicantService.add(action.applicant)),
          map(applicant => ApplicantActions.applicantAdded({applicant}))
          )
  );

  deleteApplicant = createEffect(() =>
    this.actions.pipe(
          ofType(ApplicantActions.deleteApplicant),
          concatMap((action) => this.applicantService.remove(action.applicant))
          ),
          { dispatch: false }
  );

  updateApplicant = createEffect(() =>
    this.actions.pipe(
          ofType(ApplicantActions.updateApplicant),
          concatMap((action) => this.applicantService.update((action.update.id), action.update)),
          map(ApplicantActions.clearUpdateApplicant)
          )
  );

  softDeleteApplicant = createEffect(() =>
    this.actions.pipe(
          ofType(ApplicantActions.softDeleteApplicant),
          concatMap((action) => this.applicantService.update((action.softdelete.id), action.softdelete))
          ),
          { dispatch: false}
  );
}
