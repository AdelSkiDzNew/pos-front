import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { Constant } from '../../../constants/constants';
import { ProfileUserService } from '../../../../pages/profile-user/profile-user.service';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  
  @Input()avatarImgSrc;
  @Input()adresse;
  @Input()nomRestaurant;
  @Input()userName;
  @Input()userPost;



  
  constructor(private profileUserService:ProfileUserService) {
       this.updateData();
  }

  updateData() {
    this.profileUserService.getCurrentUser().subscribe(data => {
      this.adresse =  data.adresse;
      this.avatarImgSrc = data.avatarImgSrc;
      this.nomRestaurant = data.nomRestaurant;
      this.userName      = data.userName;
      this.userPost      = data.userPost;
    })
    console.log('ProfileComponentUpdated');
  }

  ngOnInit() {

  }
  
  

}
