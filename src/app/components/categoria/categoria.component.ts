import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { CategoriaAddComponent } from './categoria-add/categoria-add.component';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categorias: any[] = [];
  filteredCategorias: any[] = [];
  search = '';
  sortField: keyof any | '' = '';
  sortAsc = true;

  constructor(private categoriaService: CategoriaService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data;
      this.filteredCategorias = [...this.categorias];
    });
  }

  // Búsqueda simple
  ngDoCheck() {
    const query = this.search.toLowerCase().trim();
    this.filteredCategorias = this.categorias.filter(c =>
      c.nombre.toLowerCase().includes(query) ||
      c.descripcion.toLowerCase().includes(query) ||
      String(c.idCategoria).includes(query)
    );
  }

  // Ordenamiento con click en columna
  sort(field: keyof any) {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }

    this.filteredCategorias.sort((a, b) => {
      return this.sortAsc
        ? (a[field] > b[field] ? 1 : -1)
        : (a[field] < b[field] ? 1 : -1);
    });
  }

  abrirModal() {
    const dialogRef = this.dialog.open(CategoriaAddComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.guardarCategoria(result);
      }
    });
  }

  guardarCategoria(data: any) {
    this.categoriaService.crearCategoria(data).subscribe({
      next: () => window.location.reload(),
      error: err => console.error(err)
    });
  }
}
