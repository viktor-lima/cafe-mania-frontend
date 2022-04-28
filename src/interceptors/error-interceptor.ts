import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StrorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{   
    
    constructor(public storage: StrorageService){

    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, cought) => {

                let errorObj = error;
                if(errorObj.error){
                    errorObj = errorObj.error;
                }
                if(!errorObj.status){
                    errorObj= JSON.parse(errorObj);
                }

                switch (errorObj.status) {
                    case 403:
                        this.handle403();
                        break;
                
                    default:
                        break;
                }
                return Observable.throw(error);
            }) as any;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide:HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};