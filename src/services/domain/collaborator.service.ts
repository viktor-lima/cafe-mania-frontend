import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONGIF } from "../../config/api.config";
import { CollaboratorDTO } from "../../models/collaborators.dto";
import { CollaboratorListDTO } from "../../models/collaboratorsList.dto";
import { StrorageService } from "../storage.service";

@Injectable()
export class CollaboratorService {

    constructor(
        public http: HttpClient,
        public storage: StrorageService) {

    }

    findAll(): Observable<CollaboratorListDTO[]> {
        return this.http.get<CollaboratorListDTO[]>(`${API_CONGIF.baseUrl}/collaborators`);
    }

    findByEmail(email: string): Observable<CollaboratorDTO> {

        return this.http.get<CollaboratorDTO>(`${API_CONGIF.baseUrl}/collaborators/email?value=${email}`);
    }

    findById(id: string): Observable<CollaboratorDTO> {
        return this.http.get<CollaboratorDTO>(`${API_CONGIF.baseUrl}/collaborators/${id}`);
    }

    insert(obj: CollaboratorDTO) {
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