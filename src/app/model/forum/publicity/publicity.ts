import {User} from '../../user+role/user';
import {Domain} from './domain';
export class Publicity {
  id: any;
  name?: string  ;
  dateStart?: Date ;
  dateEnd?: Date  ;
  nbInitTarget?: number ;
  nbFinalViews?: number;
  cost: any ;
  type: any ;
  canal: any ;
  nameFile: any ;
  ageDebut: any ;
  ageFin: any ;
  domain?: Domain ;
  user: User = new User();

  constructor() {
  }
}
