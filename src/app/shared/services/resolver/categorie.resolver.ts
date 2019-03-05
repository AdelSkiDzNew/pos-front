import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CategorieService } from '../../../pages/commande/categorie/categorie.service';

@Injectable()
export class CategorieResolver implements Resolve<any> {
    
    constructor(private _categorieService: CategorieService) {}
    resolve() {
        console.log('CategorieResolver',{});
        return this._categorieService.getAllCategoriesByUser();
    }

    
}