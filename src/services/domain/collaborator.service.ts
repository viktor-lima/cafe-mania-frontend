import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONGIF } from "../../config/api.config";
import { CollaboratorDTO } from "../../models/collaborators.dto";
import { CollaboratorNewDTO } from "../../models/collaboratorsNew.dto";
import { StrorageService } from "../storage.service";

@Injectable()
export class CollaboratorService {

    constructor(
        public http: HttpClient,
        public storage: StrorageService) {

    }

    findByEmail(email: string): Observable<CollaboratorDTO> {

        return this.http.get<CollaboratorDTO>(`${API_CONGIF.baseUrl}/collaborators/email?value=${email}`);
    }

    insert(obj: CollaboratorNewDTO){
        return this.http.post(
            `${API_CONGIF.baseUrl}/collaborators`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

}