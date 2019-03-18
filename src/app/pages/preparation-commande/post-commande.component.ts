import { Component, OnInit, OnChanges } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'
import * as $ from 'jquery'
import { Constant } from '../../shared/constants/constants';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { CategorieService } from '../commande/categorie/categorie.service';
import { SocketService } from '../../shared/services/socket.service';


@Component({
    selector: 'app-post-commande',
    templateUrl: './post.commande.component.html',
    styleUrls: ['./post.commande.component.scss']
})
export class CommandeEnLigneComponent implements OnInit,OnChanges {

    private stompClient: any;
    constructor(private _socketService: SocketService) { 
        this.stompClient  = this._socketService.initializeWebSocketConnection(this.stompClient);
        
        setTimeout(() => {
            if(this.stompClient.connected) {
                this.initMessage();
            }
        }, 10000);
        
    }

    ngOnInit(): void { 
       
    }
    
    
    

      ngOnChanges() {
          console.log("salut adel le comonenet a bien été chargé");
      }

      initMessage() {
        /*setTimeout(() => {*/
            this.stompClient.send("/app/user/queue/updates/" + localStorage.getItem('id'), {}, localStorage.getItem('data'));
       /* }, 10000);*/
      }
      
}
