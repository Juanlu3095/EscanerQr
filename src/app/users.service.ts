import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseurl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  loginusuario(email:any, password: any) {
    return this.http.post<any>(`${this.baseurl}/login.php`, {email, password})
    .pipe(map(users => { //Este users es el de la clase users
      //console.log(users.email);
      if(users.mensaje == 'Usuario correcto'){
      this.setToken(users.email);
      //this.getLoggedInName.emit(true);
      return users;
      }else{
        alert('Usuario incorrecto')
      }
    }));
  }

  registrousuario(email:any, password:any){
    return this.http.post<any>(`${this.baseurl}/registro.php`, {email, password})
  }

  setToken(token: string){
    localStorage.setItem('Usuario', token);
  }

  
}
