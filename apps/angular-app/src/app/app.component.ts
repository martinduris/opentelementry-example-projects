import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ElasticRumService } from './services/elastic-rum.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'example-projects-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(
    private httpClient: HttpClient,
    private elasticRumService: ElasticRumService
  ) { }

  public confirmBankTransfer(): void {
    this.httpClient.post(`${environment.BANK_API_BASE}/account`, null).subscribe(() => {

      }, (err) => {
        console.error('error', err);
        throw Error('Cannot load accounts!');
      }
    );
  }
}
