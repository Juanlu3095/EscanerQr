import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));

const appRoutes:Routes=[
  //{path:'', component: AppComponent, canActivate:[AuthenticationGuard]},
  

];

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxScannerQrcodeModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
