import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONGIF } from "../config/api.config";
import { CredentialsDTO } from "../models/credentials.dto";

@Injectable()
export class AuthService{


    constructor(public Http: HttpClient){
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

}