import { routes } from "./../../app.routes";
import { Component, inject, OnDestroy } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnDestroy {
  private readonly AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  _Subscription!: Subscription;
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[A-za-z_ ][A-za-z0-9_ ]{3,}$/),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/),
      ]),

      rePassword: new FormControl(null),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    },
    this.confirmPass
  );

  confirmPass(g: AbstractControl) {
    if (g.get("password")?.value === g.get("rePassword")?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  msgError: string = "";
  loading: boolean = false;

  registerSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this._Subscription = this.AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message == "success") {
            this._Router.navigate(["/login"]);
          }
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
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
