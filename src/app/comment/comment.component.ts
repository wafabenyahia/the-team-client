import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Publication} from '../model/forum/publication/publication.model';
import {CommentService} from '../service/Forum/publication/comment.service';
import {PublicationService} from '../service/Forum/publication/publication.service';
import {MatDialog} from '@angular/material/dialog';
import {RatingService} from '../service/Forum/publication/rating.service';
import {UserService} from '../service/user/user.service';
import {Comment} from '../model/forum/publication/comment';
import {User} from '../model/user+role/user';
import {valueOrDefault} from 'chart.js/helpers';
import {Domain} from '../model/forum/publicity/domain';
import {Emoji} from '../model/forum/publication/emoji';
import {RemovePublicationComponent} from '../publication/remove-publication/remove-publication.component';
import {RemoveCommentComponent} from './remove-comment/remove-comment.component';
import {UpdateCommentComponent} from './update-comment/update-comment.component';
import validateModifiers from '@popperjs/core/lib/utils/validateModifiers';
import {Estimation} from '../model/forum/publication/estimation';
import {EstimationService} from '../service/Forum/publication/estimation.service';
import {AddSousCommentComponent} from './add-sous-comment/add-sous-comment.component';
import {OpenChartEstimationComponent} from './open-chart-estimation/open-chart-estimation.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private Act: ActivatedRoute, private  commentService: CommentService,
              private publicationService: PublicationService, private dialog: MatDialog,
              private  userService: UserService, private  estimationService: EstimationService) {
  }
  private user: User;

  pub: Publication;
  comment: Comment;
  verif = false;
  clicked = false;
  comments: Comment[] = [];
  allc: Comment[] = null;
  username: string[] = [];
  public myArray = Object.values(Emoji).map(item => String(item));
  vEmoji = -1;
  count = 0;

  ngOnInit(): void {
    this.pub = new Publication();
    this.comment = new Comment();
    this.comments = [];
    this.allc = [];
    this.username = [];
    this.publicationService.findById(this.Act.snapshot.params.id).subscribe(value => {
      this.pub = value;
      this.allc = this.allcomments();
      this.commentService.findAllPluspersitant(this.pub.id).subscribe(res => {
        this.comments = res;
        this.comments.forEach(value3 => {
          console.log(value3.iduser);
          this.userService.findById(value3.iduser).subscribe(value4 => {
            this.username.push(value4.username);
            console.log('usernames' + this.username);
          });
        });
      });
    });
    this.userService.findUserWithToken().subscribe(val => {
      console.log(val);
      // @ts-ignore
      this.user = val;
      console.log(this.user);
    });

  }

  handleSelection(event) {
    this.comment.comment += event.char;
    // console.log(this.comment.comment);
  }

  addcom() {
    this.comment.iduser = this.user.id;
    this.commentService.add(this.comment, this.pub.id).subscribe(value => {
      console.log(value);
      this.comment = new Comment();
      this.ngOnInit();
    });
  }

  verifword(event: KeyboardEvent) {
    if (event.key !== ' ') {
      const words = this.comment.comment.split(' ');
      console.log(words[words.length - 1]);
      this.commentService.badword(words[words.length - 1]).subscribe(res => {
        const verifword = res;
        if (verifword !== words[words.length - 1]) {
          console.log(res);
          let newWord: string;
          newWord = '';
          for (let i = 0; i < words[words.length - 1].length; i++) {
            newWord += '*';
          }
          words[words.length - 1] = newWord;
          this.comment.comment = words.join(' ');
        }
      });
    }
  }

  allcomments() {
    let all: Comment[];
    all = [];
    this.commentService.findAllByPublicationId(this.pub.id).subscribe(value => {
      all = value;
    });
    return all;
  }

  openDialogModify(id: number) {
    const dialogRef = this.dialog.open(UpdateCommentComponent, {
      width: '600px',
      data: {
        id: id
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

  openDialogDelete(id: number) {
    const dialogRef = this.dialog.open(RemoveCommentComponent, {
      width: '600px',
      data: {
        id: id
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

  addEstimation(emoji: string, id: number) {
let est: Estimation ;
  est = new Estimation();
  est.emoji = emoji ;
  est.iduser = this.user.id ;
  this.estimationService.add(est, id).subscribe(value => {
  console.log(value);
  this.vEmoji = -1;
  }); }
  verifEstimation(id) {
    let comment = new Comment();
    this.commentService.findById(id).subscribe(value => {
      comment = value ;
      if (comment.estimations.filter(val => val.iduser === this.user.id ).length === 0) {
        this.vEmoji = id ;
        console.log(this.vEmoji);
      } else {
        this.vEmoji = -1;
      }
    });
  }

  addSCom(id:  number)  {
    const dialogRef = this.dialog.open(AddSousCommentComponent, {
      width: '600px',
      data: {
        id: id
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

  openchart(id: number) {
    const dialogRef = this.dialog.open(OpenChartEstimationComponent, {
      width: '600px',
      data: {
        id: id
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
}
