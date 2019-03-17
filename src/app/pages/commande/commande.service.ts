import { ApiService } from '../../shared/services/api.service';
import { Commande } from './model/commande.model';
import { Observable } from 'rxjs';
import { Constant } from '../../shared/constants/constants';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class CommandeService {
   
    constructor(private _api: ApiService) {}

    public saveOrUpdateCommande(commande: Commande,save: boolean): Observable<Commande> {
        return this._api.POST(commande,Constant.saveOrUpdateCommande+'/'+save);
    } 
}