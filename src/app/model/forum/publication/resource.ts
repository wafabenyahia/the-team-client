import {Publication} from './publication.model';


export class Resource {
   id: any;
   name: any ;
   url: any;
   publication: Publication= new Publication();


  constructor() {
  }
}
