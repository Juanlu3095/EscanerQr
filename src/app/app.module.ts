import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { QrscannerComponent } from './qrscanner/qrscanner.component';
import { RegistroComponent } from './registro/registro.component';

LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));

const appRoutes:Routes=[

  {path:'', component: QrscannerComponent, /*canActivate:[AuthenticationGuard]*/},
  {path:'login', component: LoginComponent, /*canActivate:[AuthenticationGuard]*/},
  {path:'registro', component: RegistroComponent, /*canActivate:[AuthenticationGuard]*/}
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QrscannerComponent,
    RegistroComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxScannerQrcodeModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
