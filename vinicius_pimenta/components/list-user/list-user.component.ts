import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService, IUsers } from '../../service/api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  selectedId: number | undefined;
  form: FormGroup;
  users: IUsers[] = [];

  constructor(
    private readonly apiservice: ApiService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.maxLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(120)]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiservice.selectall().subscribe({
      next: (data: IUsers[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários', error);
      }
    });
  }

  edit(user: IUsers): void {
    this.selectedId = user.id;
    this.form.patchValue({
      name: user.name,
      age: user.age,
      description: user.description
    });
  }

  updateUser(): void {
    if (!this.selectedId) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.apiservice.update(this.selectedId, this.form.value).subscribe({
      next: () => {
        alert('Usuário atualizado com sucesso!');
        this.loadUsers();
        this.clearForm();
      },
      error: (error) => {
        console.error('Erro ao atualizar usuário', error);
      }
    });
  }

  clearForm(): void {
    this.selectedId = undefined;
    this.form.reset();
  }

 delete(id: number): void {
  
  const confirmDelete = confirm("Você tem certeza que deseja deletar este usuário?");
  
  if (confirmDelete) {
    
    this.apiservice.delete(id).subscribe(() => {
      alert("Usuário deletado!!");
      this.loadUsers();
      if (this.selectedId === id) this.clearForm();
    });
  }
}

}
