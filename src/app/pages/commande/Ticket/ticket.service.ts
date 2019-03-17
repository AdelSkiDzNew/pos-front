import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Observable } from 'rxjs';
import { Constant } from '../../../shared/constants/constants';
import { TicketDto } from '../model/ticketDto.model';


@Injectable()
export class TicketService {

    constructor(private _api: ApiService) {}

    public getNextTicketForToDayAndUser(): Observable<TicketDto> {
        return this._api.GET(Constant.getNextTicketForToDayAndUser+'/'+localStorage.getItem('id'));
    } 
}