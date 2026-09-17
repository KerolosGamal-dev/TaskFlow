import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  showPassword = false;

  signupForm: FormGroup = this.fb.group({
    role: ['student', [Validators.required]],
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]]
  }, { validators: this.passwordMatchValidator });

  setRole(role: string): void {
    this.signupForm.patchValue({ role });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { mismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Account created:', this.signupForm.value);
      alert('Account Created Successfully!');
      this.router.navigate(['/login']);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
