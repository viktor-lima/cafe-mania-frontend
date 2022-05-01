import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONGIF } from "../../config/api.config";
import { ItemDTO } from "../../models/item.dto";

@Injectable()
export class ItemService{
    constructor(public http: HttpClient){

    }

    findAll() : Observable<ItemDTO[]> {
        return this.http.get<ItemDTO[]>(`${API_CONGIF.baseUrl}/items`);
    }
    findById(id: string ) : Observable<ItemDTO[]> {
        return this.http.get<ItemDTO[]>(`${API_CONGIF.baseUrl}/items/${id}`);
    }
    findPage() : Observable<ItemDTO[]> {
        return this.http.get<ItemDTO[]>(`${API_CONGIF.baseUrl}/items/page`);
    }
}