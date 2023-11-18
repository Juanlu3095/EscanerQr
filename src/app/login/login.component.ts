import { Component, OnInit,  } from '@angular/core';
import { UsersService } from '../users.service';
import { users } from '../users';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginform:FormGroup; //indicamos que loginform es un FormGroup, esto es una instancia de loginform

  constructor(
    private userService: UsersService,
    private fb: FormBuilder, //con el formBuilder acortamos el código que habría que usarse con formGroup o formArray u otro contructor complicado
    private router:Router) 
    {
      //declaramos el grupo que conforma el form y los inicializamos como elementos vacíos (''), luego con los validators ponemos las restricciones.
      this.loginform = this.fb.group({
        email: ['', [Validators.required, Validators.minLength(1), Validators.email]], //podemos poner aquí el required en vez de ponerlo en el html
        password: ['', Validators.required]
      });
    }
  
    enviar(loginform:any){
      this.userService.loginusuario(loginform.value.email, loginform.value.password)
      .pipe(first())
      .subscribe(response => {this.loginform.patchValue(response);
        if(localStorage.getItem('Usuario')){
          this.router.navigate(['']);
        }
        
      }
      );
      
    }

  ngOnInit(): void {
    if(localStorage.getItem('Usuario')){
      this.router.navigate(['']);
     
    }
  }
  
  
}
