import { Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly HttpClient = inject(HttpClient);

  setRegisterForm(data: object): Observable<any> {
    return this.HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }
  setLoginForm(data: object): Observable<any> {
    return this.HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  forGetPass(data: object): Observable<any> {
    return this.HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }
  validationCode(data: object): Observable<any> {
    return this.HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }
  resetPassword(data: object): Observable<any> {
    return this.HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, data);
  }
}
