// src/app/auth/register/register.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name:     ['', Validators.required]
    });
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }
    const { email, password, name } = this.registerForm.value;
    try {
      // Llamamos al endpoint de registro de usuario
      await this.auth.register(email, password, name);
      // Después de registrar, redirigimos al login
      this.router.navigate(['/login']);
    } catch (err: any) {
      this.errorMessage = err.error?.error || 'Error al registrar usuario.';
    }
  }
}
