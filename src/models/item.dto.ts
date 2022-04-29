import { CollaboratorDTO } from "./collaborators.dto";

export interface ItemDTO{
    id : string;
    name: string;
    description: string;
    collaborator: CollaboratorDTO;
}