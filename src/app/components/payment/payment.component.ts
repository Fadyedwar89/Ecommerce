import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CartService } from "../../core/services/cart.service";

@Component({
  selector: "app-payment",
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: "./payment.component.html",
  styleUrl: "./payment.component.scss",
})
export class PaymentComponent implements OnInit {
  private readonly FormBuilder = inject(FormBuilder);
  private readonly ActivatedRoute = inject(ActivatedRoute);
  private readonly CartService = inject(CartService);
  cartId: string | null = "";
  loading: boolean = false;

  payForm: FormGroup = this.FormBuilder.group({
    city: [null, [Validators.required]],
    details: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  });
  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get("id");
      },
    });
  }
  PaymentSubmit(): void {
    if (this.payForm.valid) {
      this.loading = true;
      this.CartService.paymentCash(this.cartId, this.payForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == "success") {
            window.open(res.session.url,'_self');
          }
        },
     
      });
    }
    this.loading = false;
  }
}
