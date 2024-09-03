import { OnDestroy, OnInit } from "@angular/core";
import { Component, inject } from "@angular/core";
import { ProductService } from "../../core/services/product.service";
import { ActivatedRoute } from "@angular/router";
import { Iproduct } from "../../core/interfaces/iproduct";
import { NgClass } from "@angular/common";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { ToastrService } from "ngx-toastr";
import { CartService } from "../../core/services/cart.service";

@Component({
  selector: "app-selection",
  standalone: true,
  imports: [NgClass, CarouselModule],
  templateUrl: "./selection.component.html",
  styleUrl: "./selection.component.scss",
})
export class SelectionComponent implements OnInit {
  private readonly _ProductService = inject(ProductService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService);
  product: Iproduct = {} as Iproduct;
  heart: boolean = false;

  customOptionscat: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ["", ""],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        let hmada = res.get("id");
        this._ProductService.getSpecificProduct(hmada).subscribe({
          next: (res) => {
            this.product = res.data;
          },
         
        });
      },
      error: (err) => {
        console.log(err);
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
  heartCheck() {
    if (this.heart == false) {
      this.heart = true;
    } else {
      this.heart = false;
    }
  }
}
