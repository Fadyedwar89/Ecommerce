import { AuthService } from "./../../core/services/auth.service";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-forgetpassword",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./forgetpassword.component.html",
  styleUrl: "./forgetpassword.component.scss",
})
export class ForgetpasswordComponent {
  cont: number = 1;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  _Subscription!: Subscription;
  EmailForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  codeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  });

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [
      null,
      [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/),
      ],
    ],
  });
  loading: boolean = false;

  forGetpass(): void {
    if (this.EmailForm.valid) {
      this.loading = true;
      this._Subscription = this.AuthService.forGetPass(this.EmailForm.value).subscribe({
        next: (res) => {
          if (res.statusMsg == "success") {
            this.cont = 2;
            this.loading = false;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
  codePass(): void {
    if (this.codeForm.valid) {
      this.loading = true;
      this.AuthService.validationCode(this.codeForm.value).subscribe({
        next: (res) => {
          if (res.status == "Success") {
            this.cont = 3;
            this.loading = false;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
  done(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.AuthService.resetPassword(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem("token", `${res.token}`);
          this._Router.navigate(["/home"]);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }

  ngOnDestroy(): void {
    this._Subscription?.unsubscribe();
  }
}
