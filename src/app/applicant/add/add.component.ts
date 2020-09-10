import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Applicant } from '../models/applicant.model';
import { addApplicant } from '../actions/applicant.actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
  addForm: FormGroup;

  constructor(private store: Store<AppState>, private addFormBuilder: FormBuilder) { }

  addApplicant(){
    const { name, email, phoneNumber, loanAmount } = this.addForm.value;
    const applicant:Applicant = {
       id: 0,
       name: name,
       email: email,
       phoneNumber: phoneNumber,
       loanAmount: loanAmount,
       softDelete: false
     }
    this.store.dispatch(addApplicant({applicant}));
    this.addForm.reset();
    }

  ngOnInit() {
    this.addBuildForm();
  }

  addBuildForm() {
    this.addForm = this.addFormBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{3}-[0-9]{3}-[0-9]{4}$")]],
    loanAmount: ['', Validators.required]
    });
  }

  get addFormControl() {
    return this.addForm.controls;
  }

}
