import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Applicant } from '../models/applicant.model';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  private headers: HttpHeaders;
  private applicantsAPI = 'https://localhost:44382/api/applicants';
 

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public get(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(this.applicantsAPI, {headers: this.headers});
  }

  public add(applicant: Applicant): Observable<Applicant> {
    return this.http.post<Applicant>(this.applicantsAPI, applicant, {headers: this.headers});
  }

  public remove(applicant: Applicant) {
    return this.http.delete(this.applicantsAPI + '/' + applicant.id, {headers: this.headers});
  }

  public update(updateId: number, updateChanges: Partial<Applicant>): Observable<any>{
    return this.http.put(this.applicantsAPI + '/' + updateId, updateChanges, {headers: this.headers});
  }

}
