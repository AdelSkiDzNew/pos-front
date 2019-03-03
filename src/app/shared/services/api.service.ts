import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import { Constant } from '../constants/constants';

@Injectable()
export class ApiService {

    /**
     * Constructor
     * @param _httpClient
     */
    constructor(private _httpClient: HttpClient) {

    }

    public GET(url): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'));


        return this._httpClient.get<any>(`${Constant.baseUrl}` + url, { headers: headers });
    }

    public POST(body: any, url: any): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', localStorage.getItem('token'));
        return this._httpClient.post<any>(`${Constant.baseUrl}` + url, body, { headers: headers });
    }
}