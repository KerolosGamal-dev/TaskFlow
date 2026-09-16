import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent { 
  constructor(private router: Router) {}

  ForgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  selectDomain(domain: string): void {
    const currentEmail = this.ForgetPasswordForm.get('email')?.value || '';
    const username = currentEmail.includes('@') ? currentEmail.split('@')[0] : currentEmail;
    const newEmail = username ? `${username}${domain}` : `alex.reed${domain}`;
    
    this.ForgetPasswordForm.patchValue({ email: newEmail });
    this.ForgetPasswordForm.get('email')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.ForgetPasswordForm.valid) {
      alert('Recovery link sent to: ' + this.ForgetPasswordForm.value.email);
      this.router.navigate(['/login']);
    }
  }
}