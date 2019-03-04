import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs';
import { Constant } from '../../shared/constants/constants';
import { ProfileUSer } from './profile-user.model';
import {switchMap,map} from 'rxjs/operators';

@Injectable()
export class ProfileUserService {
    private readonly imageTypeJPG: string = 'data:image/JPG;base64,';
    private readonly imageTypePNG: string = 'data:image/PNG;base64,';
    private readonly imageTypeJPEG: string = 'data:image/JPEG;base64,';
    constructor(private _api: ApiService,private sanitizer: DomSanitizer) {
    }


    public saveOrUpdateProfile(profile: ProfileUSer, formdata: any): Observable<any> {
        if ( formdata === undefined) {
            return this._api.POST(profile, Constant.saveOrUpdateProfile);
        } else {
            return this._api.POST(profile,
                Constant.saveOrUpdateProfile)
                .pipe(
                    switchMap(resultOne => this._api.POST(formdata,
                        Constant.saveOrUpdateImageProfile + '/' + localStorage.getItem('id')).pipe(
                            map(resultTwo => [resultOne, resultTwo])
                        )
                    )
                );
        }
    }

    public getCurrentUser(): Observable<any> {
        return this._api.GET(Constant.getProfileCurrentUser +'/'+`${localStorage.getItem('id')}`)
                .pipe(
                    map(data => {
;                        if(data == null) {
                            return {avatarImgSrc:'../../../../../assets/images/logo-za-elcham.jpeg',
                                    userName : Constant.userName,
                                    userPost: Constant.userName,
                                    adresse : Constant.adresse,
                                    nomRestaurant : Constant.nomRestaurant
                                }
                            
                        } else {
                            let avatarImgSrc :any;
                            if(data.extentionFile.toUpperCase() == 'JPEG') {
                                avatarImgSrc = this.sanitizer.bypassSecurityTrustUrl(this.imageTypeJPEG + data.encodedImage);
                            }
                            if(data.extentionFile.toUpperCase() == 'JPG') {
                                avatarImgSrc = this.sanitizer.bypassSecurityTrustUrl(this.imageTypeJPG + data.encodedImage);
                            }
                            if(data.extentionFile.toUpperCase() == 'PNG') {
                                avatarImgSrc = this.sanitizer.bypassSecurityTrustUrl(this.imageTypePNG + data.encodedImage);
                            }   
                            return {
                                    avatarImgSrc: avatarImgSrc,
                                    userName : data.nom,
                                    userPost:  data.prenom,
                                    adresse : data.adresse,
                                    nomRestaurant : data.nomRestaurant   
                                }
                        }
                    })
                );
    }

    public getCurrentProfile(): Observable<any> {
        return this._api.GET(Constant.getProfileCurrentUser +'/'+`${localStorage.getItem('id')}`)
    }
}