import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, IUsers } from './service/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angula-att-7';

  form!: FormGroup;
  users: IUsers[] = [];
  selectedId?: number;

  constructor(
    private fb: FormBuilder,
    private apiservice: ApiService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadUsers();
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', (Validators.required, Validators.minLength(3))],
      age: ['', (Validators.required, Validators.maxLength(3))],
      description: ['',(Validators.required, Validators.maxLength(120))]
    });
  }

  loadUsers(): void {
    this.apiservice.selectall().subscribe(data => {
      this.users = data;
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const userData: IUsers = this.form.value;

    if (this.selectedId) {
      this.apiservice.update(this.selectedId, userData).subscribe(() => {
        console.log('Atualizado');
        this.clearForm();
        this.loadUsers();
      });
    } else {
      this.apiservice.create(userData).subscribe(() => {
        console.log('Criado');
        this.clearForm();
        this.loadUsers();
      });
    }
  }

  edit(user: IUsers): void {
    this.selectedId = user.id;
    this.form.patchValue({
      name: user.name,
      age: user.age,
      description: user.description
    });
  }

  delete(id: number): void {
    this.apiservice.delete(id).subscribe(() => {
      console.log(`Deletado usuário ${id}`);
      this.loadUsers();
    });
  }

  clearForm(): void {
    this.selectedId = undefined;
    this.form.reset();
  }
}
