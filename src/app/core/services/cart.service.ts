import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly HttpClient = inject(HttpClient);

  addToCart(data: string): Observable<any> {
    return this.HttpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      productId: data,
    });
  }
  getCart(): Observable<any> {
    return this.HttpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }
  clearCart(): Observable<any> {
    return this.HttpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
  clearSelectCart(data: string): Observable<any> {
    return this.HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${data}`);
  }
  updateCartProduct(data: string, count: number): Observable<any> {
    return this.HttpClient.put(`${environment.baseUrl}/api/v1/cart/${data}`, {
      count: count,
    });
  }

  paymentCash(data: string | null, shippingAdd: object): Observable<any> {
    return this.HttpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${data}?url=http://localhost:4200`,
      {
        shippingAddress: shippingAdd,
      }
    );
  }
}
