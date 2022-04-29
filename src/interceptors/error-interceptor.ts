import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StrorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";
import { FieldMessage } from "../models/fieldmessage";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StrorageService, public alertCtrl: AlertController) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch((error, cought) => {

                let errorObj = error;
                if (errorObj.error) {
                    errorObj = errorObj.error;
                }
                if (!errorObj.status) {
                    errorObj = JSON.parse(errorObj);
                }

                switch (errorObj.status) {
                    case 401:
                        this.handle401();
                        break;
                    case 403:
                        this.handle403();
                        break;
                    case 422:
                        this.handle422(errorObj);
                        break
                    default:
                        this.handleDefaultError(errorObj);
                        break;
                }
                return Observable.throw(error);
            }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }
    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Error 401 authentication failure',
            message: 'Incorrect email or password',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'ok'
                }
            ]
        });
        alert.present();
    }

    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Error 422: Validation',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'ok'
                }
            ]
        });
        alert.present();
    }
    
    handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Error ' + errorObj.status + ": " + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: true,
            buttons: [
                {
                    text: 'ok'
                }
            ]
        });
        alert.present();
    }

    private listErrors(messages: FieldMessage[]): string {
        let s: string = '';
        for (let i = 0; i < messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};