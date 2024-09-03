import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";

@Injectable({
  providedIn: "root",
})
export class BrandsService {
  HttpClient = inject(HttpClient);

  getBrandsList(): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/brands`);
  }
  getSpecificBrand(id: string): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/brands/${id}`);
  }
}
