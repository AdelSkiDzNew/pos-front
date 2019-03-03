import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { Categorie } from './categorie.model';
import { Constant } from '../../../shared/constants/constants';

@Injectable()
export class CategorieService {

    constructor(private _api: ApiService) {}

    public getAllCategories(): Observable<Categorie[]> {
        return this._api.GET(Constant.getAllCategories)
    } 
}