import {Component, Input, OnInit} from '@angular/core';
import {AddPublicationComponent} from './add-publication/add-publication.component';
import {Publication} from '../model/forum/publication/publication.model';
import {PublicationService} from '../service/Forum/publication/publication.service';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../service/user/user.service';
import {User} from '../model/user+role/user';
import {HttpResponse} from '@angular/common/http';
import {OptionService} from '../service/Forum/publication/option.service';
import {Rating} from '../model/forum/publication/rating';
import {RatingService} from '../service/Forum/publication/rating.service';
import {RemovePublicationComponent} from './remove-publication/remove-publication.component';
import {IAlert} from '../sections/alerts-section/alerts-section.component';
import {Comment} from '../model/forum/publication/comment';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  // survey: Survey = new Survey() ;
  constructor(private publicationService: PublicationService, private dialog: MatDialog, private  ratingServie: RatingService,
              private  userService: UserService, private optionService: OptionService) {

  }

  publications: Publication[];
  user: User;

  // findbyId(idU: any): string {
  //   let user: User = null ;
  //  return   this.userService.findById(idU).subscribe(value => {
  //    //console.log(value);
  //    user = value ;
  //    //console.log(user);
  //     });
  //  if (user.username !== null ) {
  //    return user.username ;
  //  } else { return  null ; }
  // }

  private isUScustomer: Boolean;
  @Input()
  public alert: IAlert = null;
  // private backup: IAlert;
  icon: string = null;
  public isVisible = false;
  comment: Comment;
  verif = null ;

  ngOnInit(): void {
    this.comment = new Comment();
    //console.log(this.findbyId(1));
    this.user = new User();
    this.userService.findUserWithToken().subscribe(val => {
      console.log(val);
      // @ts-ignore
      this.user = val;
      console.log(this.user);
    });
    this.publications = [];
    this.publicationService.list().subscribe((value: Publication[]) => {
      console.log(value);
      this.publications = value;
    });
  }


  openAddpub(type: string) {
    const dialogRef = this.dialog.open(AddPublicationComponent, {
      width: '600px',
      data: {
        type: type,
      },
      // position: {
      //   top: '10px'
      // }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });

  }

  openDialogModify(id: number) {

  }

  openDialogDelete(id: number) {
    const dialogRef = this.dialog.open(RemovePublicationComponent, {
      width: '600px',
      data: {
        id: id
      },
      position: {
        top: '10px'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  addopSuvery(idO: number) {
    this.optionService.addOp(idO, this.user.id).subscribe(x => {
      console.log(x);
      this.isUScustomer = x;
      if (this.isUScustomer) {
        this.ngOnInit();
        this.alert = {
          id: 1,
          type: 'success',
          strong: 'Success!',
          message: 'you are option added with succes ',
          icon: 'ni ni-like-2'
        };
      } else {
        this.alert = {
          id: 4,
          type: 'danger',
          strong: 'Danger!',
          message: 'you are added your option',
          icon: 'ni ni-support-16'
        };
      }
      this.isVisible = true;
      setTimeout(() => this.isVisible = false, 2500);
    });
    // this.optionService.addOp(id, this.user.id).subscribe(res => {
    //   console.log(res); });
    //     // @ts-ignore
    //     console.log(res.token);
    // this.optionService.addOp(id, this.user.id).subscribe((x) => {
    //   console.log(x);
    //   // if(x)   //<--------expected to need x.body
    //   //   alert('login success')
    //   // else
    //   //   alert('login failed')
    // });
    // // ((value) => {
    // //      console.log(value);
    // //      // const verif = value;
    // //      // if (verif === true) {this.ngOnInit(); }
    // // });
  }

  verifie(ratings) {
    if (ratings.filter(value => value.iduser === this.user.id).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  addRating(id) {
    let rat: Rating;
    rat = new Rating();
    rat.iduser = this.user.id;
    rat.note = 1;
    this.ratingServie.add(rat, id).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    }, err => {
      console.log('you are aded your reating');
    });
  }
}
