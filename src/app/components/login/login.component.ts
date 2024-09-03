import { AuthService } from "./../../core/services/auth.service";
import { Component, inject, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnDestroy {
  private readonly AuthService = inject(AuthService);
  private readonly FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  _Subscription!: Subscription;

  loginForm: FormGroup = this.FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/),
      ],
    ],
  });

  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [
  //     Validators.required,
  //     Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/),
  //   ]),
  // });

  msgError: string = "";
  loading: boolean = false;
  loginSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      this._Subscription = this.AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message == "success") localStorage.setItem("token", `${res.token}`);
          this._Router.navigate(["/home"]);

          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.msgError = err.error.message;
        },
      });
    }
  }
  ngOnDestroy(): void {
    this._Subscription?.unsubscribe();
  }
}
