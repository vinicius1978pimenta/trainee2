import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUsers } from '../users-interface';
import { ApiService } from '../../service/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterModule],
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.maxLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(120)]]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user: IUsers = this.form.value;

    this.apiservice.create(user).subscribe({
      next: () => {
        alert('Usuário criado com sucesso!');
        this.clearForm();
      },
      error: (error) => {
        console.error('Erro ao criar usuário', error);
      }
    });
  }

  clearForm(): void {
    this.form.reset();
  }
}
