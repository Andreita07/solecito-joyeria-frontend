import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria-add',
  templateUrl: './categoria-add.component.html',
})
export class CategoriaAddComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoriaAddComponent>
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  guardar() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); // Regresa los datos al componente padre
    }
  }

  cancelar() {
    this.dialogRef.close(null);
  }
}
