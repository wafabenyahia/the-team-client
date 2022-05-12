import {Component, Inject, OnInit} from '@angular/core';
import {PublicityService} from '../../service/Forum/publicity/publicity.service';
import {NgbCalendar, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Publicity} from '../../model/forum/publicity/publicity';
import {Domain} from '../../model/forum/publicity/domain';
import {CommentService} from '../../service/Forum/publication/comment.service';
import {Comment} from '../../model/forum/publication/comment';

@Component({
  selector: 'app-update-comment',
  templateUrl: './update-comment.component.html',
  styleUrls: ['./update-comment.component.css']
})
export class UpdateCommentComponent implements OnInit {

// tslint:disable-next-line:max-line-length
  constructor(private commentService: CommentService, private dialogRef: MatDialogRef<UpdateCommentComponent>, @Inject(MAT_DIALOG_DATA) private data: any) {

  }
  comment: Comment = new Comment();
  verif = false;

  modify() {
    console.log(this.comment);
    this.commentService.modify(this.comment).subscribe(res => {
      console.log(res);
      this.dialogRef.close();
    }); }

  close() {
    this.dialogRef.close();
  }

  handleSelection(event) {
    this.comment.comment += event.char;
    // console.log(this.comment.comment);
  }

  verifword(event: KeyboardEvent) {
    if (event.key !== ' ' ) {
      const words = this.comment.comment.split(' ');
      console.log(words[words.length - 1]);
      this.commentService.badword(words[words.length - 1]).subscribe(res => {
        const verifword = res ;
        if (verifword !== words[words.length - 1]) {
          console.log(res) ;
          let newWord: string ;
          newWord = '';
          for ( let i = 0 ; i < words[words.length - 1].length; i++ ) {
            newWord += '*';
          }
          words[words.length - 1] = newWord;
          this.comment.comment = words.join(' ');
        }
      } );
    }}
  ngOnInit() {
    this.comment = new Comment();
    this.commentService.findById(this.data.id).subscribe((res: Comment) => {
      this.comment = res;
      console.log(this.comment);
    });
  }
}
