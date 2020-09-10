import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Applicant } from '../models/applicant.model';
import { addApplicant, updateApplicant } from '../actions/applicant.actions';
import { Observable } from 'rxjs';
import { fetchApplicantOnEdit } from '../selectors/applicant.selectors';
import { FormGroup, FormControl } from '@angular/forms';
import { ApplicantState } from '../reducers/applicant.reducers';
import { AppState } from '../reducers';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})

export class CreateComponent implements OnInit {
  applicantObject: Applicant;
  applicantObjectUnderEdit: Observable<Applicant>;

  applicantEditGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    loanAmount: new FormControl('')
  });

  applicantAddGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    loanAmount: new FormControl('')
  });

  constructor(private store: Store<AppState>) {
     this.applicantObjectUnderEdit = store.select(fetchApplicantOnEdit);
  }

   addApplicant(){
    const { name, email, phoneNumber, loanAmount } = this.applicantAddGroup.value;
    const applicant:Applicant = {
       id: 0,
       name: name,
       email: email,
       phoneNumber: phoneNumber,
       loanAmount: loanAmount,
       softDelete: 'false'
     }
    this.store.dispatch(addApplicant({applicant}));
    this.applicantAddGroup.reset();
   }

   editApplicant() {
     const { name, email, phoneNumber, loanAmount } = this.applicantEditGroup.value;
     const update:Applicant = {
        id: 0,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        loanAmount: loanAmount,
        softDelete: 'false'
      }
      const editApplicantObserver = this.applicantObjectUnderEdit.subscribe(applicant => update.id = applicant.id);
      editApplicantObserver.unsubscribe();
      this.store.dispatch(updateApplicant({update}));
      this.applicantEditGroup.reset();
    }
    
  ngOnInit() {
  }

}
