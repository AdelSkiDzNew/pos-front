import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ProfileUserService } from '../../../../pages/profile-user/profile-user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'info-user',
    templateUrl: './info-user.component.html',
    styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {
    @Input('infoUseravatarImgSrc') avatarImgSrc:any;
    @Input('infoUserUserName') userName:string;
    @Input('infoUserUserPost') userPost:string;

    constructor(private profileService: ProfileUserService,sanitizer: DomSanitizer) {
        this.updateCurrentUser();
    }

    updateCurrentUser() {
        this.profileService.getCurrentUser().subscribe(data => {
            this.avatarImgSrc = data.avatarImgSrc;
            this.userName     = data.userName;
            this.userPost     = data.userPost;
        });
        console.log("InfoUserComponent Updated");
    }

    ngOnInit(): void { }

}
