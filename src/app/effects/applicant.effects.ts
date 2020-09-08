import { Injectable } from '@angular/core'
import { Actions, ofType, createEffect } from '@ngrx/effects'
import { map, concatMap } from 'rxjs/operators'
import { ApplicantService } from '../services/applicant-service.service'
import * as ApplicantActions from '../actions/applicant.actions'
import { Update } from '@ngrx/entity'
import { Applicant } from '../models/applicant.model'

@Injectable()
export class ApplicantEffects {

  constructor(
    private actions: Actions,
    private applicantService: ApplicantService
  ) {}      

  loadApplicants = createEffect(() => 
    this.actions.pipe(
          ofType(ApplicantActions.loadApplicants),
          concatMap(() => this.applicantService.get()),
          map(applicants => ApplicantActions.applicantsLoaded({applicants}))
          )
  ); 
          
  addApplicant = createEffect(() => 
    this.actions.pipe(
          ofType(ApplicantActions.addApplicant),
          concatMap((action) => this.applicantService.add(action.applicant))
          ),
          { dispatch: false }
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
          concatMap((action) => this.applicantService.update((action.update.id), action.update))
          ),
          { dispatch: false }
  );

}