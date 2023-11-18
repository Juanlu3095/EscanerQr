import { Component, OnInit,  } from '@angular/core';
import { UsersService } from '../users.service';
import { users } from '../users';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit{

  registroform:FormGroup;

  constructor(private userService: UsersService,
    private fb: FormBuilder,
    private router:Router)
    {
      this.registroform = this.fb.group({
        email: ['', [Validators.required, Validators.minLength(1), Validators.email]], 
        password: ['', Validators.required]
      });
    }

  enviar(registroform:any){
      this.userService.registrousuario(registroform.value.email, registroform.value.password)
      .pipe(first())
      .subscribe(response => {this.registroform.patchValue(response);
        if(response.mensaje == 'Registro completado'){
          alert('Registro completado');
          this.router.navigate(['/login']);
        } else if(response.mensaje == 'Usuario existente'){
          alert('El usuario que indica ya existe')
        } else{
          alert('Ha ocurrido un error. Inténtelo más tarde.')
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
