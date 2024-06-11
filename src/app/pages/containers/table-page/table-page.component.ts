import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

import { TableListComponent } from '@pages/components/table-list/table-list.component';
import { DataService } from '@services/data.service';
import { GithubIssue } from '@models/github-issue.model';

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [TableListComponent],
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss'
})
export class TablePageComponent {

  $records: GithubIssue[] = [];
  totalRecords: number = 0;
  isLoading: boolean = true;
  isRateLimitReached: boolean = false;
  errorMessage: string = '';

  constructor(private dataService: DataService) { }

  // seting the default values for the table
  ngOnInit(): void {
    const url = new URL(location.toString());
    url.searchParams.set('sort', 'created');
    url.searchParams.set('order', 'desc');
    url.searchParams.set('page', '1');
    history.pushState({}, "", url);

    this.fetchData();
  }

  // fetching the data from the service
  fetchData(): void {
    this.isLoading = true;
    this.dataService.getRepoIssues()
      .subscribe(data => {
        this.totalRecords = data.total_count;
        this.$records = data.items;
        this.isLoading = false;
        this.isRateLimitReached = false;
      }, error => {
        this.errorMessage = error.error.message;
        this.isLoading = false;
        this.isRateLimitReached = true;
      });
  }

  // handling the sort change event
  onSortChange(event: Sort) {
    const url = new URL(location.toString());
    url.searchParams.set('sort', event.active);
    url.searchParams.set('order', event.direction);
    url.searchParams.set('page', '1');
    history.pushState({}, "", url);
    this.fetchData();
  }

  // handling the page change event
  onPageChange(event: PageEvent) {
    const url = new URL(location.toString());
    url.searchParams.set('page', (event.pageIndex + 1).toString());
    history.pushState({}, "", url);

    this.fetchData();
  }
}
