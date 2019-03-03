import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { UploadEvent, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ProfileUSer } from './profile-user.model';
import { FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';
import { ProfileUserService } from './profile-user.service';
import { Observable } from 'rxjs';
import {map,switchMap,mergeMap} from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { PagesTopComponent } from '../../shared/layouts/pages-top/pages-top.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

  titleDrop: string = 'Déposez une photo de produit... ici';
  avatarImgSrc: string ;


  @ViewChild('fileInput') inputEl: ElementRef;
  
  file: any;
  url: string;
  nameFile: string;
  profileUSer : ProfileUSer = {} as ProfileUSer;
  settingsForm: FormGroup;
  @ViewChild('profileForm') profileForm: NgForm = new NgForm(null, null)

  
  constructor( private formBuilder: FormBuilder, private _root:Router,
    private profileUserService: ProfileUserService) {
      
      this.reset();
  }

  upload(event) {
      if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
              this.url = e.target.result;
              this.avatarImgSrc = this.url;
          };
          reader.readAsDataURL(event.target.files[0]);
          this.file = new FormData();
          this.file.append('file', event.target.files[0]);
          this.nameFile = event.target.files[0].name;
      }
  }

  dropped(event: UploadEvent) {
      this.file = new FormData();
      for (const droppedFile of event.files) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          const reader = new FileReader();
          reader.onload = (e: any) => {
              this.url = e.target.result;
              this.avatarImgSrc = this.url;
          };
          fileEntry.file((file: File) => {
                this.file.append('file', file);
                reader.readAsDataURL(file);
                this.nameFile = fileEntry.name;
          });
        } else {
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        }
      }
  }

  reset() {
    this.settingsForm = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        adresse: ['', Validators.required],
        nomRestaurant: ['', Validators.required],
        numeroTel: ['',
            [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10),
                Validators.pattern('[0-9]+')
            ]
        ],
        siret: [''],
        logo: '',
        idUser: localStorage.getItem('id'),
        nomFichier : ''
    });
      this.file = undefined;
      this.url  = '';
      this.nameFile = '';
  }

  // convenience getter for easy access to form fields
  get forms() { return this.settingsForm.controls; }

  updateModel(values: Object) {
    Object.assign(this.profileUSer, values);
}
  submitForm() {
    if (this.settingsForm.invalid) {
        return;
    }
    this.updateModel(this.settingsForm.value);
    this.profileUSer.nomFichier = this.nameFile;
    this.profileUserService.saveOrUpdateProfile(this.profileUSer, this.file)
            .toPromise().then(() => {
                this.reset();
            }, error => {
                if (error.status === 200) {
                    this.reset();
                }
    });
  }






  public fileOver(event) {
      console.log(event);
  }
  
  public fileLeave(event) {
      console.log(event);
  }

  ngOnInit(): void {
      
  }


}
