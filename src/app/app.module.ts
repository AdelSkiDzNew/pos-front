import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/auth-guard/AuthGuard';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './shared/services/api.service';
import { ProfileUserService } from './pages/profile-user/profile-user.service';
import { CategorieResolver } from './shared/services/resolver/categorie.resolver';
import { CategorieService } from './pages/commande/categorie/categorie.service';
import { SocketService } from './shared/services/socket.service';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    PagesModule,
    routing
  ],
  declarations: [
    AppComponent
  ],

  providers : [
    AuthGuard,
    ApiService,
    ProfileUserService,
    CategorieResolver,
    CategorieService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
