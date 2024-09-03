import { Component } from "@angular/core";
import { AuthLayoutComponent } from "../../layout/auth-layout/auth-layout.component";
import { NavAuthComponent } from "../nav-auth/nav-auth.component";

@Component({
  selector: "app-notfound",
  standalone: true,
  imports: [AuthLayoutComponent, NavAuthComponent],
  templateUrl: "./notfound.component.html",
  styleUrl: "./notfound.component.scss",
})
export class NotfoundComponent {}
