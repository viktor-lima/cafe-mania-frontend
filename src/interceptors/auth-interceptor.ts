import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StrorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{  
    
    constructor(public storage: StrorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser();
        if(localUser){
            const authReq = req.clone({headers:req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }
        else
            return next.handle(req);
    }
}

export const AuthInterceptorProvider = {
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};