import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatrizMonitorComponent } from './public/matriz-monitor/matriz-monitor.component';
import { MatrizMonitorService } from './services/matriz-monitor.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { NgSpinKitModule } from 'ng-spin-kit'

@NgModule({
  declarations: [
    AppComponent,
    MatrizMonitorComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgSpinKitModule
  ],
  providers: [MatrizMonitorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
