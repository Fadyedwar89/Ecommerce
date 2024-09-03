import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environments";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CheckOutService {
  private readonly HttpClient = inject(HttpClient);

  getWishList(): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`);
  }
}
