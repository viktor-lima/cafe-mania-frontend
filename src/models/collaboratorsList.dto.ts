import { ItemDTO } from "./item.dto";

export interface CollaboratorListDTO {
    id: string;
    name: string;
    email: string;
    cpf: string;
    items: ItemDTO;
}