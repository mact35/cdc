import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatrizMonitorComponent } from './public/matriz-monitor/matriz-monitor.component';
import { MatrizMonitorService } from './services/matriz-monitor.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { NgSpinKitModule } from 'ng-spin-kit'
import { LoadingComponent } from './public/loading/loading.component'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import { ProgressBarModule } from 'angular-progress-bar';
import { HeaderComponent } from './public/header/header.component';
@NgModule({
  declarations: [
    AppComponent,
    MatrizMonitorComponent,
    LoadingComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    NgSpinKitModule,
    NgbProgressbarModule,
    ProgressBarModule
  ],
  providers: [MatrizMonitorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
