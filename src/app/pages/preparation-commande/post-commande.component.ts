import { Component, OnInit, OnChanges } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'
import * as $ from 'jquery'
import { Constant } from '../../shared/constants/constants';


@Component({
    selector: 'app-post-commande',
    templateUrl: './post.commande.component.html',
    styleUrls: ['./post.commande.component.scss']
})
export class CommandeEnLigneComponent implements OnInit,OnChanges {
    constructor() { 
        this.initializeWebSocketConnection();
    }

    ngOnInit(): void { }

    private serverUrl = Constant.serverUrlSocket;
    private stompClient;
    messages   = [];
    
    initializeWebSocketConnection(){
            let ws = new SockJS(this.serverUrl);
            this.stompClient = Stomp.over(ws);
            let that = this;
            this.stompClient.connect({}, function(frame) {
            that.stompClient.subscribe("/user/queue/specific-user/"+localStorage.getItem('id'), (message) => {
                    if(message.body) {
                        var data = new Array();
                        data = JSON.parse(message.body);
                        // by order 
                        data = data.sort(function(a, b) {
                            if (a.numeroTicket < b.numeroTicket)
                              return 1;
                            if (a.numeroTicket > b.numeroTicket)
                              return -1;
                            return 0;
                        });
                        $('.chat').empty();
                        for( let i in data) {
                            $(".chat").append("<div class='card' style='margin-bottom: 3px!important;color:white;padding: 5px!important;background: linear-gradient(to top right, #2cc3ff, #15f8bf);'><div class='card-header'>"+data[i].numeroTicket+"<span class='blink_me' style='float: right;color:black'>"+data[i].statut+"</span></div></div>") 
                        }
                        
                    }
                    setTimeout(() => {
                        this.messages = data;
                        console.log('**************',this.messages);
                    }, 100);
            });
        });
      }

      ngOnChanges() {
          console.log("salut adel le comonenet a bien été chargé");
      }
}
