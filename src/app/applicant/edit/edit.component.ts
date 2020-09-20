import { Component, OnInit } from '@angular/core';
import { Applicant } from '../models/applicant.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { getCurrentApplicant } from '../selectors/applicant.selectors';
import { updateApplicant, setEditedApplicantId, loadApplicants, loadEditedApplicant } from '../actions/applicant.actions';
import { getCurrentRouteState } from '../selectors/applicant.selectors'
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, map, mergeMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  applicantId:number;
  applicantEditObject: Applicant;
  applicantFormFill: Applicant;
  applicantObjectUnderEdit:Observable<Applicant>;
  editForm: FormGroup;
  applicantFillSubscriber: Applicant;

  constructor(private store: Store<AppState>, private editFormBuilder: FormBuilder, private route: ActivatedRoute) {
  }

  editApplicant() {
    const { name, email, phoneNumber, loanAmount, softDelete } = this.editForm.value;
    const update:Applicant = {
       id: 0,
       name: name,
       email: email,
       phoneNumber: phoneNumber,
       loanAmount: loanAmount,
       softDelete: false
     }
     const editApplicantObserver = this.applicantObjectUnderEdit.subscribe(applicant => update.id = applicant.id);
     this.store.dispatch(updateApplicant({update}));
     editApplicantObserver.unsubscribe();
     this.editForm.reset();
  }

  ngOnInit() {
    console.log('in ngoninit');
    this.editBuildForm();
    this.loadApplicantForEdit();
    
    // this.setEditFormValues();
  }

  loadApplicantForEdit() {
    const routeSubscription = this.store.select(getCurrentRouteState).pipe(take(1)).subscribe(route => {
        const applicantId = route.params.applicantId;
        console.log("route params id: ", applicantId);
        this.store.dispatch(loadEditedApplicant({applicantId}));
        this.store.dispatch(setEditedApplicantId({applicantId}));
    });
    this.applicantObjectUnderEdit = this.store.select(getCurrentApplicant);

    const applicantFillSubscriber = this.applicantObjectUnderEdit
      .pipe(filter(applicant => !!applicant), take(1))
      .subscribe(applicant => 
      this.applicantFormFill = applicant);
    this.setEditFormValues(this.applicantFormFill);


    // applicantFillSubscriber.unsubscribe();
    // routeSubscription.unsubscribe();
}

  editBuildForm() {
    this.editForm = this.editFormBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{3}-[0-9]{3}-[0-9]{4}$")]],
    loanAmount: ['', Validators.required],
    softDelete: [false]
    });
  }

  setEditFormValues(applicant) {
    this.editForm.setValue({
      name: applicant.name,
      email: applicant.email,
      phoneNumber: applicant.phoneNumber,
      loanAmount: applicant.loanAmount,
      softDelete: false
    })
  }

  get editFormControl() {
    return this.editForm.controls;
  }


  ngOnDestroy() {
 }
}
