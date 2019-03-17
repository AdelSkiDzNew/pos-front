import { Component, OnInit, OnChanges } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'
import * as $ from 'jquery'
import { Constant } from '../../shared/constants/constants';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { CategorieService } from '../commande/categorie/categorie.service';


@Component({
    selector: 'app-post-commande',
    templateUrl: './post.commande.component.html',
    styleUrls: ['./post.commande.component.scss']
})
export class CommandeEnLigneComponent implements OnInit,OnChanges {

    
    constructor() { 
        this.initializeWebSocketConnection();
        this.initMessage();
    }

    ngOnInit(): void { 
       
    }

    private serverUrl = Constant.serverUrlSocket;
    private stompClient: any;
    private  ws :any;
    messages   = [];
    
    initializeWebSocketConnection(){
            this.ws = new SockJS(this.serverUrl);
            this.stompClient = Stomp.over(this.ws);
            let that = this;
            this.stompClient.connect({}, function(frame) {
            //frame.body = localStorage.getItem('data');
            //console.log('frame body',frame.body);
            that.stompClient.subscribe("/user/queue/specific-user/"+localStorage.getItem('id'), (message) => {
                console.log('subscribe ',message.body);
                if(message.body) {
                        var data = new Array();
                        data = JSON.parse(message.body);
                        $('.chat').empty();
                        for( let i in data) {
                            $(".chat").append("<div class='card "+data[i].cssClass+"'"+"style='margin-bottom: 3px!important;color:black;fond-weight:bold;font-size: 24px;padding: 5px!important;'><div class='card-header'>"+data[i].numeroTicket+"<span class='blink_me' style='float: right;color:black'>"+data[i].statut+"</span></div></div>") 
                        }
                        
                }
            });
        },function (message) {
            console.log('message disconnect '+ message);
        });
      }

      ngOnChanges() {
          console.log("salut adel le comonenet a bien été chargé");
      }

      initMessage() {
        setTimeout(() => {
            this.stompClient.send("/app/user/queue/updates/" + localStorage.getItem('id'), {}, localStorage.getItem('data'));
        }, 10000);
      }
      
}
