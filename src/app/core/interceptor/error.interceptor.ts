import { AuthService } from "../service/auth.service";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { SnackbarService } from "src/app/shared/snackbar.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService,private router:Router,private snackbar:SnackbarService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          console.log("Error message ",err.message)
          this.snackbar.showNotification("snackbar-danger", "Unauthorized access. Please log in.");
          this.router.navigate(["/authentication/signin"]);
          // location.reload();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
