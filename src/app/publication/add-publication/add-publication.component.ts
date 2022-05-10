import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Publication} from '../../model/forum/publication/publication.model';
import {User} from '../../model/user+role/user';
import {UserService} from '../../service/user/user.service';
import {PublicationService} from '../../service/Forum/publication/publication.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WebcamImage} from 'ngx-webcam';
import {Survey} from '../../model/forum/publication/survey';
import {Option} from '../../model/forum/publication/option';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {FileService} from '../../service/Forum/publication/file.service';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent implements OnInit {

constructor(private userService: UserService, private  publicationService: PublicationService,
              private dialogRef: MatDialogRef<AddPublicationComponent>,
              private fileService: FileService ,
              @Inject(MAT_DIALOG_DATA) public data: any) {
}
  publication: Publication = new Publication();
  users: User[] = [];
  survey: Survey ;
  user: User = new User() ;
 type: string = null;
  toggled = false;
  message = '';
  public webcamImage: WebcamImage = null;
  files: File[] = [];
  selectedEmoji: any;
    name = 'Angular';
    mood = '';
    showEmojiPicker = false;
    sets = [
        'native',
        'google',
        'twitter',
        'facebook',
        'emojione',
        'apple',
        'messenger'
    ]
    set = 'twitter';
    option1: Option;
    option2: Option;

    usersControl = new FormControl([]);
    usersSel: User[] = [];
    // categories: User[] = [];
  handleSelection(event) {
    this.message += event.char;
  }
  ngOnInit(): void {
    this.type = this.data.type ;
    this.users = [];
    this.survey = new  Survey();
    this.option1 = new Option();
    this.option2 = new Option();
    this.publication = new Publication();
    // @ts-ignore
    this.userService.list().subscribe((res) => {
      this.users = res ;
      // this.categories = this.users ;
      // this.users= res ;
      //   this.users3= this.users.
    });
  }
    onFileChange(files: FileList) {
        this.files.push( files.item(0));
    }

  addP() {
      this.publication.topic = this.message ;
      this.publication.mood = this.mood ;
      if (this.usersSel !==  null) {
          let idlist: number[] ;
          idlist = new Array() ;
          this.usersSel.forEach(value1 => {
              idlist.push(value1.id);

          });
          // @ts-ignore
          this.publication.idUserIden = idlist ;
      }
      if ( this.publication.survey.question !== null) {
           this.publication.survey.options = [] ;
          this.publication.survey.options.push(this.option1);
          this.publication.survey.options.push(this.option2);

      }
      console.log(this.publication);

      this.publicationService.add(this.publication).subscribe(value2 => {
          // @ts-ignore
          console.log(value2.id);
         // @ts-ignore
          const id = value2.id ;
          if (this.files !== null) {
              this.files.forEach(value => {
                  console.log(value.name) ;
                  this.fileService.fileUpload(id, value).subscribe( val =>{
                      console.log(val);
                  });
                  console.log(value.name) ; });
              if (this.webcamImage != null) {
                  const base64 = this.webcamImage.imageAsBase64;
                  // @ts-ignore
                  const imageName = 'namewebcam' + value2.id + value2.topic  + '.png';
                  const imageBlob = this.dataURItoBlob(base64);
                  const imageFile = new File([imageBlob], imageName, { type: 'image/png' })
                  //let blob = new Blob([this.webcamImage.imageAsBase64], {type: 'image/png'});
                  // // tslint:disable-next-line:prefer-const
                  // var file = new File([blob], 'imageFileName.png');
                  this.fileService.fileUpload(id, imageFile).subscribe();
                  console.log('webcom uploder') ;
              }
          }
          this.dialogRef.close();
      });
  }

  close() {
    this.dialogRef.close();
  }

  IsTyping() {
  }
    dataURItoBlob(dataURI) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/png' });
        return blob;
    }
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }
  //
  // select(event) {
  //     console.log(event.char);
  //     this.selectedEmoji = event.char;
  //     // this.pasteHtmlAtCaret("<span>hi</span>");
  // }
  //   toggleEmojiPicker() {
  //       console.log(this.showEmojiPicker);
  //       this.showEmojiPicker = !this.showEmojiPicker;
  //   }

    addEmoji(event) {
        const { mood } = this;
        console.log(`${event.emoji.native}`)
        const text = `${mood}${event.emoji.native}`;

        this.mood = text;
        // this.showEmojiPicker = false;
    }

    onFocus() {
        console.log('focus');
        this.showEmojiPicker = false;
    }
    onBlur() {
        console.log('onblur');
    }

    /**
     * Write code on Method
     *
     * method logical code
     */
    onCatRemoved(cat: User) {
        const categories = this.usersSel as User[];
        this.removeFirst(categories, cat);
        this.usersControl.setValue(categories); // To trigger change detection
        this.usersSel = categories ;
    }
    private removeFirst(array: User[], toRemove: User): void {

        const index = array.indexOf(toRemove);
        if (index !== -1) {
            array.splice(index, 1);
        }
    }
}
