import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReadComponent } from './read/read.component';
import { CreateComponent } from './create/create.component';
import { ApplicantService } from './services/applicant-service.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Reducers } from './reducers/index';
import { ApplicantEffects } from './effects/applicant.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './routing/customserializer';
import { AppRoutingModule } from './routing/routing.module'

@NgModule({
  declarations: [
    AppComponent,
    ReadComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    StoreModule.forRoot(Reducers),
    // StoreModule.forFeature('appstate', Reducers),
    EffectsModule.forRoot([ApplicantEffects]),
    AppRoutingModule,
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    })
  ],
  providers: [ApplicantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
