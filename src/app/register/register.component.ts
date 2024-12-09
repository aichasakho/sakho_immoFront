import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {




  registerForm: FormGroup;
  isCliForm: boolean = true;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerForm = this.fb.group({
      nom_complet: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmed_password: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.registerForm.value;

    if (this.isCliForm) {
      this.registerService.registerClient(formData)
        .subscribe({
          next: (response) => {
            console.log('Registration successful', response);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            if (error.status === 422) {
              console.error('Validation errors:', error.error.errors);
            } else {
              console.error('An error occurred:', error);
            }
          }
        });
    } else {
      this.registerService.registerOwner(formData)
        .subscribe({
          next: (response) => {
            console.log('Owner registration successful', response);
            this.router.navigate(['/login']);
          },
          error: (error) => {
            if (error.status === 422) {
              console.error('Validation errors:', error.error.errors);
            } else {
              console.error('An error occurred:', error);
            }
          }
        });
    }
  }

  showCliForm() {
    this.isCliForm = true;
  }

  showPropForm() {
    this.isCliForm = false;
  }
}
