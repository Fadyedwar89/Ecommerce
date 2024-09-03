import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const blankGuard: CanActivateFn = (route, state) => {
  let _Router = inject(Router);

  if (typeof localStorage !== "undefined") {
    if (localStorage.getItem("token") == null) {
      return true;
    } else {
      _Router.navigate(["/home"]);

      return false;
    }
  } else {
    return false;
  }
};
