import {Resource} from './resource';
import {Rating} from './rating';
import {User} from '../../user+role/user';
import {Survey} from './survey';

export class Publication {
   id: any  ;
   topic: any ;
   dateCreation: any ;
   location: any ;
   mood: any ;
   idUserIden?: any[] ;
  resources: Resource[] = [];
  ratings: Rating[] = [];
  comments: Comment[] = [] ;
  user: User = new User();
  survey: Survey = new Survey();


  constructor() {
  }
}
