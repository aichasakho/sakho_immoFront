import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BienComponent } from './bien/bien.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminBiensComponent } from './admin-biens/admin-biens.component';
import {FormsModule} from "@angular/forms";
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    BienComponent,
    ReservationComponent,
    AdminBiensComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
