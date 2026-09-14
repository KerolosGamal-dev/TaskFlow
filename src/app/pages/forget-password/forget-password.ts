import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css'
})
export class ForgetPasswordComponent {

  ForgetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  selectDomain(domain: string): void {
    const currentEmail = this.ForgetPasswordForm.get('email')?.value || '';

    const username = currentEmail.includes('@')
      ? currentEmail.split('@')[0]
      : currentEmail;

    const newEmail = username ? `${username}${domain}` : `alex.reed${domain}`;

    this.ForgetPasswordForm.patchValue({ email: newEmail });
    this.ForgetPasswordForm.get('email')?.markAsTouched();
  }

  onSubmit(): void {
    if (this.ForgetPasswordForm.valid) {
      console.log('Sending recovery email to:', this.ForgetPasswordForm.value.email);
    }
  }
}
