import { Component, inject, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CartService } from "../../core/services/cart.service";

@Component({
  selector: "app-nav-blank",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./nav-blank.component.html",
  styleUrl: "./nav-blank.component.scss",
})
export class NavBlankComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  cartNum: string = "0";
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartNum = res.numOfCartItems;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  rToken(): void {
    localStorage.clear();
  }
}
