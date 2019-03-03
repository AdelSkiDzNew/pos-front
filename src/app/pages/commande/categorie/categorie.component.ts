import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import {map,filter} from 'rxjs/operators'
import { Categorie } from './categorie.model';

@Component({
    selector: 'app-categorie',
    templateUrl: './categorie.component.html',
    styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
    
    @Input() listeCategorie:Array<Categorie> = new Array();
    @Output() selectedCategorie: EventEmitter<any> = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void { }

    getCategorie(item) {
        item.active = true;
        this.selectedCategorie.emit(item);
    }

}
