import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url = `${environment.apiUrl}/Categoria`; // controlador Categoria

  constructor(private http: HttpClient) {}

  /** GET api/Categoria */
  getCategorias(): Observable<any> {
    return this.http.get<any>(this.url).pipe(
      catchError(error => {
        console.error('Error al obtener categorías:', error);
        return throwError(() => error);
      })
    );
  }

  /** GET api/Categoria/{id} */
  getCategoriaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      catchError(error => {
        console.error(`Error al obtener la categoría con ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  /** POST api/Categoria */
  crearCategoria(data: any): Observable<any> {
    return this.http.post<any>(this.url, data).pipe(
      catchError(error => {
        console.error('Error al crear la categoría:', error);
        return throwError(() => error);
      })
    );
  }

  /** PUT api/Categoria/{id} */
  actualizarCategoria(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, data).pipe(
      catchError(error => {
        console.error(`Error al actualizar la categoría con ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  /** DELETE api/Categoria/{id} */
  eliminarCategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`).pipe(
      catchError(error => {
        console.error(`Error al eliminar la categoría con ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }
}
