import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReadComponent } from './applicant/read/read.component';
import { ApplicantAPIService } from './applicant/services/applicantAPI.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Reducers } from './applicant//reducers/index';
import { ApplicantEffects } from './applicant//effects/applicant.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './routing/customserializer';
import { AppRoutingModule } from './routing/routing.module';
import { AddComponent } from './applicant/add/add.component';
import { EditComponent } from './applicant/edit/edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    ReadComponent,
    AddComponent,
    EditComponent,
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatGridListModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forRoot(Reducers),
    EffectsModule.forRoot([ApplicantEffects]),
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
    }),
    BrowserAnimationsModule
  ],
  providers: [ApplicantAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
