import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";

@Injectable({
  providedIn: "root",
})
export class WishlistService {

  private readonly HttpClient = inject(HttpClient);

  getWishList(): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,);
  }
  clearSelectWish(data: string): Observable<any> {
    return this.HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${data}`,);
  }
  
  addSelectWish(data: string): Observable<any> {
    return this.HttpClient.post(
      `${environment.baseUrl}/api/v1/wishlist`,
      {
        productId: data,
      },
      
    );
  }
}
