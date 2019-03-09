import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import saveAs from 'file-saver';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Produit } from './nouveau.produit.model';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ProduitService } from '../produit.service';
import { CategorieService } from '../../commande/categorie/categorie.service';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Categorie } from '../../commande/categorie/categorie.model';


@Component({
    selector: 'app-nouveau-produit',
    templateUrl: './nouveau.produit.component.html',
    styleUrls: ['./nouveau.produit.component.scss']
})
export class NouveauProduitComponent implements OnInit {

    titleDrop: string = 'Déposez une photo de produit... ici';
    @ViewChild('fileInput') inputEl: ElementRef;
    file: any;
    url: string;
    nameFile: string;
    produit: Produit = {} as Produit;
    settingsForm: FormGroup;
    errors: string;
    @ViewChild('nouveauProduitForm') profileForm: NgForm = new NgForm(null, null)
    listeCategie= [];
    errorsServer: string;
    constructor(private formBuilder: FormBuilder,
                private _produitService: ProduitService,
                private _categorieService: CategorieService) {
        this.reset();
    }

    upload(event) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.url = e.target.result;
                console.log(e.target);
            };
            reader.readAsDataURL(event.target.files[0]);
            this.file = new FormData();
            this.file.append('file', event.target.files[0]);
            this.nameFile = event.target.files[0].name;
        }
    }

    dropped(event: UploadEvent) {
        this.file = new FormData();
        for (const droppedFile of event.files) {
            if (droppedFile.fileEntry.isFile) {
                const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.url = e.target.result;
                };
                fileEntry.file((file: File) => {
                    this.file.append('file', file);
                    reader.readAsDataURL(file);
                    this.nameFile = fileEntry.name;
                });
            } else {
                const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            }
        }
    }

    reset() {
        this.settingsForm = this.formBuilder.group({
            nomProduit: ['', Validators.required],
            prixInitialProduct: ['', Validators.required],
            nomCategorie: ['',Validators.required],
            path: '',
            nomImage: '',
            idUser: 0
        });
        this.errors = '';
        this.errorsServer = '';
        this.file = undefined;
        this.url = '';
        this.nameFile = '';
        this.settingsForm.reset();
        this.profileForm.resetForm();
        if (this.inputEl !== undefined) {
            this.inputEl.nativeElement.value = '';
        }
        this._categorieService.getAllCategoriesByUser().subscribe(data => {
            this.listeCategie = data;
        })
    }
    submitForm() {
        if (this.settingsForm.invalid) {
            return;
        }
        if (this.file === undefined) {
            this.errors = 'La photo de produit est obligatoire';
            return;
        }
        this.updateModel(this.settingsForm.value);
        this.produit.nomImage = this.nameFile;
        this.produit.idUser = parseInt(localStorage.getItem('id')),
        this._produitService.saveOrUpdateProduit(this.produit, this.file)
            .subscribe((data) => {
                console.log('data',data);
            }, err => {
                this.errorsServer = err.error.message;
                return;
            })
    }

    // convenience getter for easy access to form fields
    get forms() { return this.settingsForm.controls; }

    updateModel(values: Object) {
        Object.assign(this.produit, values);
    }

    public fileOver(event) {
        console.log(event);
    }

    public fileLeave(event) {
        console.log(event);
    }

    ngOnInit(): void { }
}
