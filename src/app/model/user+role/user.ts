import {Role} from './role';


export class User {
    id: any;
    firstName: any;
   lastName : any;
   username: any;
   password : any;
   birthdate: any;
   address: any;
   email: any;
   // notifications: Notification[];
   //  subscriptions: Subscription;

     // @ts-ignore
  etat : any;
roles : Role[]=[];
   phone: any ;
 //  publicities: Publicity[]=[];
 // publications : Publication[] = [];
// certificats: Certificat[]=[];
//  formations;
//
// private List<Appointment> appointments ;
//
//  List<Reclamation> reclamations ;
//
// List<Events> events ;

  constructor() {
  }
}
