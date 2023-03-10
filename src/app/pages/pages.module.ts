import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';

import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';

/* components */
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { FormsModule } from '@angular/forms';
import { CommandeEnLigneComponent } from './preparation-commande/post-commande.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        LayoutModule,
        routing
    ],
    declarations: [
        PagesComponent,
        LoginComponent,
        CommandeEnLigneComponent
    ],
    providers :[
        LoginService
    ]
})
export class PagesModule { }
