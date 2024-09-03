import { Component, inject, OnInit } from "@angular/core";
import { Iwishlist } from "../../core/interfaces/iwishlist";
import { WishlistService } from "../../core/services/wishlist.service";
import { CartService } from "../../core/services/cart.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-wishlist",
  standalone: true,
  imports: [],
  templateUrl: "./wishlist.component.html",
  styleUrl: "./wishlist.component.scss",
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  listData: Iwishlist[] = [];
  done: any = "";
  ngOnInit(): void {
    this.getWishList();
  }

  getWishList(): void {
    this._WishlistService.getWishList().subscribe({
      next: (res) => {
        this.listData = res.data;
      },
     
    });
  }
  addToCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message);
        this.clearToWish(id);
      },
     
    });
  }

  clearToWish(id: string): void {
    this._WishlistService.clearSelectWish(id).subscribe({
      next: (res) => {
        this.getWishList();
      },
      
    });
  }
}
