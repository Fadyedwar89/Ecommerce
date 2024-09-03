import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { LoginComponent } from "./components/login/login.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProductComponent } from "./components/product/product.component";
import { CartComponent } from "./components/cart/cart.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { HomeComponent } from "./components/home/home.component";
import { BlankLayoutComponent } from "./layout/blank-layout/blank-layout.component";
import { WishlistComponent } from "./components/wishlist/wishlist.component";
import { authGuard } from "./core/guards/auth.guard";
import { BrandComponent } from "./components/brand/brand.component";
import { blankGuard } from "./core/guards/blank.guard";
import { SelectionComponent } from "./components/selection/selection.component";
import { ForgetpasswordComponent } from "./components/forgetpassword/forgetpassword.component";
import { PaymentComponent } from "./components/payment/payment.component";

export const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    canActivate: [blankGuard],
    children: [
      { path: "", pathMatch: "full", redirectTo: "login" },
      { path: "login", component: LoginComponent, title: "login" },
      { path: "register", component: RegisterComponent, title: "register" },
      { path: "forgotPasswords", component: ForgetpasswordComponent, title: "For get password" },
    ],
  },
  {
    path: "",
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: "", pathMatch: "full", redirectTo: "home" },
      { path: "home", component: HomeComponent, title: "home" },
      { path: "product", component: ProductComponent, title: "products" },
      { path: "wishlist", component: WishlistComponent, title: "wish List" },
      { path: "cart", component: CartComponent, title: "cart" },
      { path: "details/:id", component: SelectionComponent, title: "details" },
      { path: "check_out/:id", component: PaymentComponent, title: "check_out" },
      { path: "allorders", component: HomeComponent, title: "home" },
      {
        path: "categories",
        component: CategoriesComponent,
        title: "categories",
      },
      { path: "brands", component: BrandComponent, title: "brands" },
    ],
  },

  { path: "**", component: NotfoundComponent, title: "not found" },
];
