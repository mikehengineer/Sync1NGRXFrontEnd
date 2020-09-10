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

@NgModule({
  declarations: [
    AppComponent,
    ReadComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
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
    })
  ],
  providers: [ApplicantAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
