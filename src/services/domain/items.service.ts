import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemContent } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { API_CONGIF } from "../../config/api.config";
import { ItemDTO } from "../../models/item.dto";
import { ItemNewDTO } from "../../models/itemNew.dto";

@Injectable()
export class ItemService{
    constructor(public http: HttpClient){

    }

    findAll() : Observable<ItemDTO[]> {
        return this.http.get<ItemDTO[]>(`${API_CONGIF.baseUrl}/items`);
    }
    findPage() : Observable<ItemDTO[]> {
        return this.http.get<ItemDTO[]>(`${API_CONGIF.baseUrl}/items/page`);
    }

    insert(obj: ItemNewDTO) {
        return this.http.post(
            `${API_CONGIF.baseUrl}/items`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    remove(id: string) {
        return this.http.delete(
            `${API_CONGIF.baseUrl}/items/${id}`
        );
    }

    update(obj: ItemDTO, id: string){
        return this.http.put(
            `${API_CONGIF.baseUrl}/items/${id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}