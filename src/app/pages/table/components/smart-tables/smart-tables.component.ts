
import { Component, OnInit } from '@angular/core';
import { TablesService } from '../../../../shared/services/tables.service';

@Component({
  selector: 'app-smart-tables',
  templateUrl: './smart-tables.component.html',
  styleUrls: ['./smart-tables.component.scss'],
  providers: [TablesService]

})
export class SmartTablesComponent implements OnInit {
  table_data: Array<any>;

  /* pagination Info */
  pageSize = 1;
  pageNumber = 1;

  constructor(private _tablesService: TablesService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.table_data = this._tablesService.DEFAULT_DATA;
  }

  pageChanged(pN: number): void {
    this.pageNumber = pN;
  }
}