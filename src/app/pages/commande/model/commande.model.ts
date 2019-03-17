import { TicketDto } from './ticketDto.model';
import { InformationTicket } from './iformationTicket.model';

export interface Commande {
    id: number;
    idUser: number;
	statut: string;
	ticketDto: TicketDto;
	informationTicketDtos :  Array<InformationTicket>;
}