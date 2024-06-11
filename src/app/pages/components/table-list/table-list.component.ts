import { Component, SimpleChanges, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { PageEvent, MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { GithubIssue } from '@models/github-issue.model';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    RouterModule,
    ScrollingModule,
  ],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss'
})
export class TableListComponent implements AfterViewInit {

  @Input() records!: GithubIssue[];
  @Input() totalRecords!: number;
  @Input() isLoading!: boolean;
  @Input() isRateLimitReached!: boolean;
  @Input() errorMessage!: string;

  @Output() tableSort = new EventEmitter<any>();
  @Output() tablePage = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['created', 'updated', 'title'];
  dataSource = new MatTableDataSource<GithubIssue>([]);
  rows: GithubIssue[] = [];
  per_page: number = 100;

  // setting the default values for the table
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // handling any record change events
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['records'] && changes?.['records'].currentValue) {
      this.updateList(changes['records'].currentValue);
    }
  }

  // updating the list of records
  updateList(records: any) {
    this.rows = [];

    records.forEach((element: any) => {
      this.rows.push({
        created_at: element.created_at,
        updated_at: element.updated_at,
        title: element.title
      });
    });

    this.dataSource = new MatTableDataSource<GithubIssue>(this.rows);
  }

  // handling the sort change event
  onSortChange(sortState: Sort) {
    this.tableSort.emit(sortState)
  }

  // handling the page change event
  onPageChange(event: PageEvent) {
    this.tablePage.emit(event)
  }

}
