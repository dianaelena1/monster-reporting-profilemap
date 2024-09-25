import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showRePassword = false;
  showConfirmButton = false;
  email: string = '';
  password: string = '';
  loginError: string = '';
  errorMessage: string = '';
  registerMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repassword: [''],
    });

    this.loginForm
      .get('repassword')
      ?.setValidators([this.matchPasswordsValidator()]);
  }

  ngOnInit(): void {}

  matchPasswordsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const form = control.parent;
      if (form) {
        const password = form.get('password');
        const repassword = form.get('repassword');
        if (password && repassword && password.value !== repassword.value) {
          return { passwordMismatch: true };
        }
      }
      return null;
    };
  }

  onRegister() {
    this.showRePassword = true;
    this.showConfirmButton = true;
    this.loginForm
      .get('repassword')
      ?.setValidators([Validators.required, this.matchPasswordsValidator()]);
    this.loginForm.get('repassword')?.updateValueAndValidity();
  }

  onCancel() {
    this.showRePassword = false;
    this.showConfirmButton = false;
    this.loginForm.get('repassword')?.clearValidators();
    this.loginForm.get('repassword')?.updateValueAndValidity();
    this.loginForm.get('repassword')?.reset();
  }

  onConfirm() {
    if (
      this.loginForm.valid &&
      this.loginForm.value.password === this.loginForm.value.repassword
    ) {
      this.authService.register(this.loginForm.value).subscribe({
        next: (response) => {
          this.registerMessage = response.message;
          if (this.registerMessage == 'User registered successfully') {
            this.showRePassword = false;
            this.showConfirmButton = false;
            this.loginForm.reset();
            this.errorMessage = '';
            this.email = '';
            this.password = '';
          }
        },
        error: (err) => {
          console.error('Registration failed:', err);
        },
      });
    } else {
      console.error('Form is not valid or passwords do not match');
    }
  }

  onSubmit(): void {
    const user = { email: this.email, password: this.password };

    this.authService.login(user).subscribe(
      (response) => {
        if (response.message === 'Login successful') {
          this.authService.setUserName(response.name);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.error;
        }
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
