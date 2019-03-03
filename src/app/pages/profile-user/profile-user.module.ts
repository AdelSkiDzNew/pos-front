import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './profile-user.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProfileUserComponent } from './profile-user.component';
import { FileDropModule } from 'ngx-file-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileUserService } from './profile-user.service';
import { LayoutModule } from '../../shared/layout.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        LayoutModule,
        ReactiveFormsModule,
        routing,
        FileDropModule
    ],
    declarations: [
        ProfileUserComponent
    ]
})
export class ProfileUserModule { }
