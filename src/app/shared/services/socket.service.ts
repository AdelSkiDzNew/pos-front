import { Injectable } from '@angular/core';
import { Constant } from '../constants/constants';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'
import * as $ from 'jquery'
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {

    private serverUrl = Constant.serverUrlSocket;
    //private stompClient: any;
    private  ws :any;
    
    initializeWebSocketConnection(stompClient: any):Observable<any>{
            this.ws = new SockJS(this.serverUrl);
            stompClient = Stomp.over(this.ws);
            let that = this;
            stompClient.connect({}, function(frame) {
                stompClient.subscribe("/user/queue/specific-user/"+localStorage.getItem('id'), (message) => {
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
            },function (message) {console.log('message disconnect '+ message);});
            console.log(stompClient);
            return stompClient;
      }
}