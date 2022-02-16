import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BattleService } from '../../battle/battle.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import {Battle} from "../../../models/battle.model";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  battles: Battle[] = [];
  battlesSub?: Subscription;
  dataSource?: any;

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['date', 'ownHero', 'enemyHero', 'winner'];

  constructor(private battleService: BattleService) {}

  ngOnInit(): void {
    this.battlesSub = this.battleService.battlesSubject.subscribe((battles) => {
      this.battles = battles;
    });
    this.dataSource = new MatTableDataSource(this.battles);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.battlesSub?.unsubscribe();
  }
}
