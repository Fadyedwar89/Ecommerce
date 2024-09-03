import { SearchPipe } from "./../../core/pipes/search.pipe";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Iproduct } from "../../core/interfaces/iproduct";
import { ProductService } from "../../core/services/product.service";
import { NgClass } from "@angular/common";
import { Subscription } from "rxjs";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CartService } from "../../core/services/cart.service";
import { ToastrService } from "ngx-toastr";
import { WishlistService } from "../../core/services/wishlist.service";
import { Iwishlist } from "../../core/interfaces/iwishlist";
import { IdheartPipe } from "../../core/pipes/idheart.pipe";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [NgClass, RouterLink, SearchPipe, IdheartPipe, FormsModule],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
})
export class ProductComponent implements OnInit, OnDestroy {
  productList: Iproduct[] = [];
  heart: Iwishlist[] = [{} as Iwishlist];
  _Subscription!: Subscription;
  Stext: string = "";
  private readonly _ToastrService = inject(ToastrService);
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  ngOnInit(): void {
    this._Subscription = this._ProductService.getAllProduct().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._WishlistService.getWishList().subscribe({
      next: (res) => {
        this.heart = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  heartCheck(id: string): void {
    this._WishlistService.addSelectWish(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.heart = res.data;
        this._ToastrService.success(res.message);
      },
      
    });
  }

  heartDes(id: string): void {
    this._WishlistService.clearSelectWish(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.heart = res.data;
        this._ToastrService.success(res.message);
      },
     
    });
  }

  addToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
      },
    });
  }
  ngOnDestroy(): void {
    this._Subscription?.unsubscribe();
  }
}
