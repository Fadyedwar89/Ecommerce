import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Ibrand } from "../../core/interfaces/ibrand";
import { BrandsService } from "../../core/services/brands.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-brand",
  standalone: true,
  imports: [],
  templateUrl: "./brand.component.html",
  styleUrl: "./brand.component.scss",
})
export class BrandComponent implements OnInit, OnDestroy {
  brandList: Ibrand[] = [];
  _Subscription!: Subscription;

  private readonly _BrandsService = inject(BrandsService);

  ngOnInit(): void {
    this._Subscription = this._BrandsService.getBrandsList().subscribe({
      next: (res) => {
        this.brandList = res.data;
      },
     
    });
  }
  ngOnDestroy(): void {
    this._Subscription?.unsubscribe();
  }
}
