import {Publication} from './publication.model';

export class Rating {
    id: any;
    note?: number;
    iduser: number ;
    publication: Publication = new Publication();

    constructor() {
    }
}
