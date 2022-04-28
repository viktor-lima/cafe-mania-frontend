import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONGIF } from "../config/api.config";
import { CredentialsDTO } from "../models/credentials.dto";
import { LocalUser } from "../models/local-user";
import { StrorageService } from "./storage.service";

@Injectable()
export class AuthService{


    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public Http: HttpClient, public storage: StrorageService){
    }
    

    authenticate(creds : CredentialsDTO){
        return this.Http.post(
            `${API_CONGIF.baseUrl}/login`, 
            creds, 
            {
                observe: 'response',
                responseType: 'text'
            });
    }

    refreshToken(){
        return this.Http.post(
            `${API_CONGIF.baseUrl}/auth/refresh_token`, 
            {}, 
            {
                observe: 'response',
                responseType: 'text'
            });
    }


    successfullLogin(authorizationValue : string){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };
        this.storage.setLocalUser(user);
    }

    logout(){
        this.storage.setLocalUser(null);
    }

}