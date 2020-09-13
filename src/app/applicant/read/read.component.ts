import { getAllApplicants } from '../selectors/applicant.selectors';
import { loadApplicants, loadEditedApplicant, deleteApplicant, updateApplicant, softDeleteApplicant } from '../actions/applicant.actions';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Applicant } from '../models/applicant.model';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../reducers/index';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.sass']
})
export class ReadComponent implements OnInit {

  applicantColumns = ['Name', 'Email', 'Phone Number', 'Loan Amount', 'Edit', 'Delete', 'Soft Delete'];
  applicantObjects: Observable<Applicant[]>;
  applicantObjectArray: Applicant[];

  constructor(private store: Store<AppState>) { 
    this.applicantObjects = this.store.select(getAllApplicants)
    const appObs = this.applicantObjects.subscribe(applicant => this.applicantObjectArray = applicant);
    console.log('applicantObjectArray: ', this.applicantObjectArray[1]);
    appObs.unsubscribe();
  }

  public editApplicant = function(applicant: Applicant){
    this.store.dispatch(loadEditedApplicant({applicant}));
  }

  public deleteApplicant = function(applicant: Applicant){
    this.store.dispatch(deleteApplicant({applicant}));
  }

  public softDeleteApplicant = function(applicant: Applicant){
    const softdelete:Applicant = {...applicant, softDelete: true};
    this.store.dispatch(softDeleteApplicant({softdelete}));
  }

  ngOnInit() {
    this.store.dispatch(loadApplicants());
  }
}
