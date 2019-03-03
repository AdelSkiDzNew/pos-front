import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './login.model';
import { Constant } from '../../shared/constants/constants';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class LoginService {

    /**
     * Constructor
     * @param _httpClient
     */
    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Call Login Endpoint
     * @param username
     * @param password
     */
    public login(user: User): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', 'Basic YWdlbmNlQWRhbTphZ2VuY2VBZGFtMjAxOA==')
        ;

        const body = new HttpParams()
            .set('username', user._userName)
            .set('password', user._password)
            .set('grant_type', 'password')
        ;

        return this._httpClient.post<any>(`${Constant.oauth}`, body, { headers: headers });
    }




    public getCurrentUser()
    {
        const headers = new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'))
        ; 

        return this._httpClient.get<any>(`${Constant.baseUrl}`+Constant.currentUser, { headers: headers });
    }


    public doLogin(user: User): Observable<any> {
        let headers = new HttpHeaders()
            .set('Authorization', 'Basic YWdlbmNlQWRhbTphZ2VuY2VBZGFtMjAxOA==')
        ;

        const body = new HttpParams()
            .set('username', user._userName)
            .set('password', user._password)
            .set('grant_type', 'password')
        ;
        return this._httpClient.post<any>(`${Constant.oauth}`, body, { headers: headers })
                .pipe(
                    map(data => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('id');
                        localStorage.setItem('token', `${data.token_type} ${data.access_token}`);
                        headers = new HttpHeaders().set('Authorization', localStorage.getItem('token')); 
                        return headers;
                    }),
                    switchMap(resultOne => this._httpClient.get<any>(`${Constant.baseUrl}`+Constant.currentUser, { headers: headers })
                        .pipe(
                                map(resultTwo => [resultOne, resultTwo])
                            )
                        )
                );
        }

}