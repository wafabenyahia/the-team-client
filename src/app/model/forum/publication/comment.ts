import {Publication} from './publication.model';
import {Estimation} from './estimation';

export class Comment {
    id: number;
    comment: string ;
    iduser: number;
    publication: Publication;
    sous_comments: string[] = [];
    idUserIden: number[] = [];
    estimations: Estimation[] =[];


    constructor() {
        this.comment = '';
    }
}
