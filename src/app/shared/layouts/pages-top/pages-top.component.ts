import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'pages-top',
  templateUrl: './pages-top.component.html',
  styleUrls: ['./pages-top.component.scss'],
})
export class PagesTopComponent implements OnChanges {
  avatarImgSrc: string; /*= 'assets/images/avatar.png';*/
  userName: string; /*= 'Folisise Chosielie';*/
  userPost: string; /*= 'Musician, Player';*/


  sidebarToggle: boolean = true;
  tip = { ring: true, email: true };

  constructor(private _globalService: GlobalService) { 
    console.log('component top upladed');
  }
  ngOnChanges(nh : SimpleChanges) {
    console.log(nh);
  }

  public _sidebarToggle() {
    /* this._globalService.sidebarToggle$.subscribe(sidebarToggle => {
      this.sidebarToggle = sidebarToggle;
    }, error => {
      console.log('Error: ' + error);
    }); */

    this._globalService.data$.subscribe(data => {
      if (data.ev === 'sidebarToggle') {
        this.sidebarToggle = data.value;
      }
    }, error => {
      console.log('Error: ' + error);
    });
    this._globalService.dataBusChanged('sidebarToggle', !this.sidebarToggle);


    //this._globalService._sidebarToggleState(!this.sidebarToggle);
  }
}
