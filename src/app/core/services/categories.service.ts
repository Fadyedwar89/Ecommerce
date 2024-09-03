import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  HttpClient = inject(HttpClient);

  getCategoriesList(): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }
  getSpecificCategories(id: string): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
  }
}
