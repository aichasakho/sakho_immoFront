import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BienComponent } from './bien/bien.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminBiensComponent } from './admin-biens/admin-biens.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    BienComponent,
    ReservationComponent,
    AdminBiensComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
