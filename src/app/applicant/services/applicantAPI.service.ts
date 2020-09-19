import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Applicant } from '../models/applicant.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicantAPIService {
  private headers: HttpHeaders;
  private applicantsAPI = 'https://localhost:44382/api/applicants';

  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  public getAll(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(this.applicantsAPI, {headers: this.headers});
  }

  public getApplicantById(id): Observable<Applicant>{
    console.log('inside getapplicantbyid');
    console.log('id: ', id);
    return this.http.get<Applicant>(this.applicantsAPI + '/' + id, {headers: this.headers});
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
