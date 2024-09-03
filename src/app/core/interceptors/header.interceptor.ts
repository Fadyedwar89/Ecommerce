import { HttpInterceptorFn } from "@angular/common/http";

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem("token") !== null) {
    if (
      req.url.includes("cart") ||
      req.url.includes("checkout") ||
      req.url.includes("wishlist") ||
      req.url.includes("orders") ||
      req.url.includes("details")
    ) {
      req = req.clone({
        setHeaders: { token: localStorage.getItem("token")! },
      });
    }
  }
  return next(req);
};
