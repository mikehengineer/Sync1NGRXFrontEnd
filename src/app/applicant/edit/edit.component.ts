import { Component, OnInit } from '@angular/core';
import { Applicant } from '../models/applicant.model';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { getCurrentApplicant } from '../selectors/applicant.selectors';
import { updateApplicant, setEditedApplicantId } from '../actions/applicant.actions';
import { getCurrentRouteState } from '../selectors/applicant.selectors'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {
  applicantId:number;
  applicantEditObject: Applicant;
  applicantFormFill: Applicant;
  applicantObjectUnderEdit: Observable<Applicant>;
  editForm: FormGroup;

  constructor(private store: Store<AppState>, private editFormBuilder: FormBuilder) {
  }

  editApplicant() {
    const { name, email, phoneNumber, loanAmount } = this.editForm.value;
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
    this.editBuildForm();
    this.loadApplicantForEdit();
    this.setEditFormValues();
  }

  loadApplicantForEdit() {
    const routeSubscription = this.store.select(getCurrentRouteState)
    .subscribe(router => {
        this.applicantId = router.params.applicantId;
    })
    const applicantId = this.applicantId;
    this.store.dispatch(setEditedApplicantId({applicantId}));
    this.applicantObjectUnderEdit = this.store.select(getCurrentApplicant);
    const applicantFillSubscriber = this.applicantObjectUnderEdit.subscribe(applicant => this.applicantFormFill = applicant);
    applicantFillSubscriber.unsubscribe();
    routeSubscription.unsubscribe();
  }

  editBuildForm() {
    this.editForm = this.editFormBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{3}-[0-9]{3}-[0-9]{4}$")]],
    loanAmount: ['', Validators.required]
    });
  }

  setEditFormValues() {
    this.editForm.setValue({
      name: this.applicantFormFill.name,
      email: this.applicantFormFill.email,
      phoneNumber: this.applicantFormFill.phoneNumber,
      loanAmount: this.applicantFormFill.loanAmount,
      softDelete: false
    })
  }

  get editFormControl() {
    return this.editForm.controls;
  }

}
