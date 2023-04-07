import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  registrarUsuario: FormGroup;
  mostrarAlerta: boolean = false;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { // inicializa la referencia a la base de datos
    this.registrarUsuario = this.fb.group({
      nombre: ['', Validators.required],
      foto: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])/)
      ]],
      password2: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])/)
      ]]
    });
  }

  registrar() {
    if (this.registrarUsuario.valid) {
      const nombre = this.registrarUsuario.value.nombre;
      const foto = this.registrarUsuario.value.foto;
      const email = this.registrarUsuario.value.email;
      const password = this.registrarUsuario.value.password;
      const password2 = this.registrarUsuario.value.password2;
  
      // Crea el usuario en Firebase Authentication
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log(userCredential);
          const user = userCredential.user;
          if (user) {
            // Agrega los datos del usuario a la base de datos de Firebase
            this.db.object(`users/${user.uid}`).set({
              email,
              nombre,
              foto,
              password2
            });
          } else {
            console.log("El usuario no se creó correctamente");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.mostrarAlerta = true;
    }
  }
}