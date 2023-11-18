import { Component, ViewChild, OnInit } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
} from 'ngx-scanner-qrcode';
import { QrService } from "../qr.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.css']
})
export class QrscannerComponent {

  title = 'qr-scanner';

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      },
    }
  };

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  constructor(private qrcode: NgxScannerQrcodeService, private qrservice: QrService, private router: Router, private route: ActivatedRoute) { }

  data:boolean= false; 
  e:any="";
  auth:any;

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
  
    /*Una vez se haya hecho el escáner la variable data controla si se puede enviar o no a la BD.*/
    /*Si data = false envía los datos al back-end*/
    if(!this.data){
      //this.e = e;
      console.log(e);
      this.e = e;
      this.addregistro();
      this.data = true;
    }
  }

  /*Con esta función reseteamos para volver a enviar datos al back-end*/
  public resetdata(){
    this.data = false;
  }

  /*Con esta función mandamos los datos a la BD*/
  addregistro() {
    this.qrservice.addQr(this.e).subscribe(response=>{this.e = response;
    console.log(response)
  });
  }

  ngOnInit():void{
    //Con esta función comprobamos que exista un usuario logueado y si no lo hay nos lleva de nuevo al login
    this.auth = localStorage.getItem('Usuario');
    if(!this.auth){
      this.router.navigate(['/login']);
    }
  }
}
