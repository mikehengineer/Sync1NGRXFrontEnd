import { Component, OnInit } from '@angular/core';
import { AppState } from '../reducers/app.state';
import { Store } from '@ngrx/store';
import { Applicant } from '../models/applicant.model';
import { addApplicant, updateApplicant, clearUpdateApplicant } from '../actions/applicant.actions';
import { Observable } from 'rxjs';
import { fetchApplicantOnEdit } from '../selectors/applicant.selectors';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})

export class CreateComponent implements OnInit {
  viewFormObject: Object;
  applicantObject: Applicant;
  applicantObjectUnderEdit: Observable<Applicant>;

  applicantEditGroup = new FormGroup({
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
    this.applicantObject = {
       id: 0,
       name: name,
       email: email,
       phoneNumber: phoneNumber,
       loanAmount: loanAmount,
       softDelete: 'false'
     }
    const applicant = {} as Applicant;
    Object.assign(applicant, this.applicantObject);
    this.store.dispatch(addApplicant({applicant}));
    this.applicantAddGroup.reset();
   }

   editApplicant(id) {
     const { name, email, phoneNumber, loanAmount } = this.applicantEditGroup.value;
     this.applicantObject = {
        id: id,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        loanAmount: loanAmount,
        softDelete: 'false'
      }
      const update = {} as Applicant;
      Object.assign(update, this.applicantObject);
      this.store.dispatch(updateApplicant({update}));
      this.applicantEditGroup.reset()
      this.store.dispatch(clearUpdateApplicant(null));
    }
    
  ngOnInit() {
  }

}
