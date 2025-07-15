// src/app/auth/login/login.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    this.errorMessage = null;
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor completa correctamente los campos.';
      return;
    }
    const { email, password } = this.loginForm.value;
    try {
      await this.auth.login(email, password);
      this.router.navigate(['/tasks']);
    } catch (err: any) {
      this.errorMessage = err.error?.error || 'Error de autenticación.';
    }
  }
}
