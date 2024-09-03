import { Subscription } from "rxjs";
import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { ProductComponent } from "../product/product.component";
import { Icategoies } from "../../core/interfaces/icategoies";
import { CategoriesService } from "../../core/services/categories.service";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [ProductComponent, CarouselModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _CategoriesService = inject(CategoriesService);
  categoriesList: Icategoies[] = [];
  _Subscription!: Subscription;

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
  customOptionscate: OwlOptions = {
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
        items: 1,
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
    this._Subscription = this._CategoriesService.getCategoriesList().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this._Subscription?.unsubscribe();
  }
}
