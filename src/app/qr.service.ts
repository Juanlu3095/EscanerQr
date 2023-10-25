import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../environments/environment";
import { ScannerQRCodeResult, } from 'ngx-scanner-qrcode';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QrService {

  baseurl = environment.baseUrl;

  constructor(public http: HttpClient) { }

  //Hay que poner la clase de los datos que se reciben para que luego los pueda pintar
  addQr(qr: ScannerQRCodeResult[]){
    console.log(qr);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
       });
    var options = { headers: headers };
      var output = this.http.post(`${this.baseurl}/post.php`, qr[0], options);
      console.log(output);
      console.log(qr[0]);
      return output;
  }
}
