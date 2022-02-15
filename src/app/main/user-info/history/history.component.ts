import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Battle, BattleService } from '../../battle/battle.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit, AfterViewInit {
  battleHistory: Battle[] = [];
  dataSource = new MatTableDataSource(this.battleService.battles);

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['date', 'ownHero', 'enemyHero', 'winner'];

  constructor(private battleService: BattleService) {}

  ngOnInit(): void {
    this.battleHistory = this.battleService.battles;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
