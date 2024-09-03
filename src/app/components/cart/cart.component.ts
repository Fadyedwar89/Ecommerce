import { Component, inject, OnInit } from "@angular/core";
import { CartService } from "../../core/services/cart.service";
import { Subscription } from "rxjs";
import { Icart } from "../../core/interfaces/icart";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _Router = inject(Router);
  _Subscription!: Subscription;

  cartData: Icart = {} as Icart;

  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartData = res;
      },
    
    });
  }
  clearAll(): void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        if (res.message == "success") {
          this._Router.navigate(["/home"]);
        }
      },
     
    });
  }
  clear(id: string): void {
    this._CartService.clearSelectCart(id).subscribe({
      next: (res) => {
        this.cartData = res;
        console.log(res);
      },
      
    });
  }
  updateToCart(id: string, count: number): void {
    this._CartService.updateCartProduct(id, count).subscribe({
      next: (res) => {
        this.cartData = res;
        console.log(res);
      },
     
    });
  }
}
