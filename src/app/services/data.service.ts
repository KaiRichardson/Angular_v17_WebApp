import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubApi } from '../models/github-issue.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _httpClient: HttpClient) { }

  getRepoIssues(): Observable<GithubApi> {
    const searchParams = new URLSearchParams(window.location.search);

    const perams: any = {
      q: `q=repo:angular/components`,
      sort: `sort=${searchParams.get('sort')}`,
      order: `order=${searchParams.get('order')}`,
      page: `page=${searchParams.get('page')}`,
      per_page: `per_page=100`
    };

    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?${perams.q}&${perams.sort}&${perams.order}&${perams.page}&${perams.per_page}`;

    return this._httpClient.get<GithubApi>(requestUrl);
  }

}
