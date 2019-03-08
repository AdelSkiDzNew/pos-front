import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { Observable } from 'rxjs';
import { Produit } from './nouveau-produit/nouveau.produit.model';
import { Constant } from '../../shared/constants/constants';
import { switchMap,map } from 'rxjs/operators';

@Injectable()
export class ProduitService {

    constructor(private _api: ApiService) {

    }

    public saveOrUpdateProduit(produit:Produit,formData: FormData): Observable<any> {
        return this._api.POST(produit,Constant.saveOrUpdateProduit)
            .pipe(
                switchMap(resultOne => 
                    this._api.POST(formData,Constant.uplodeFileProduit+'/'+produit.nomCategorie+'/'+localStorage.getItem('id'))
                    .pipe(
                        map(resultTwo => [resultOne,resultTwo])
                    )
                )
            )
    }

    public getAllProduitByUser(idCategorie): Observable<any> {
        return this._api.GET(Constant.getAllProduitByUser+'/'+localStorage.getItem('id')+'/'+idCategorie);
            
    }
}