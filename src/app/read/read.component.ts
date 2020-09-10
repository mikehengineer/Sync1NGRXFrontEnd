import { getAllApplicants } from '../selectors/applicant.selectors';
import { loadApplicants, loadEditedApplicant, deleteApplicant } from '../actions/applicant.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Applicant } from '../models/applicant.model';
import { Component, OnInit } from '@angular/core';
import { ApplicantState } from '../reducers/applicant.reducers';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.sass']
})
export class ReadComponent implements OnInit {

  applicantObjects: Observable<Applicant[]>;

  constructor(private store: Store<ApplicantState>) { 
    this.applicantObjects = this.store.select(getAllApplicants);
  }

  public editApplicant = function(applicant: Applicant){
    this.store.dispatch(loadEditedApplicant({applicant}));
  }

  public deleteApplicant = function(applicant: Applicant){
    this.store.dispatch(deleteApplicant({applicant}));
  }

  ngOnInit() {
    this.store.dispatch(loadApplicants());
  }
}
