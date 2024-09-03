import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CategoriesService } from "../../core/services/categories.service";
import { Icategoies } from "../../core/interfaces/icategoies";
import { Subscription } from "rxjs";
import { TitleCasePipe } from "@angular/common";

@Component({
  selector: "app-categories",
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private readonly _CategoriesService = inject(CategoriesService);
  _Subscription!: Subscription;

  categoriesList: Icategoies[] = [];

  ngOnInit(): void {
    this._CategoriesService.getCategoriesList().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
      },
     
    });
  }
  ngOnDestroy(): void {
    this._Subscription?.unsubscribe();
  }
}
