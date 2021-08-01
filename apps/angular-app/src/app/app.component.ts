import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ElasticRumService } from './services/elastic-rum.service';
import { getLogoForBank, getTitleForBank } from './utils/bank.utils';
import { environment } from '../environments/environment';

@Component({
  selector: 'example-projects-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  getLogoForBank = getLogoForBank;
  getTitleForBank = getTitleForBank;

  accounts: any[] = []; // TODO openapi entity
  transactions: any[] = []; // TODO openapi entity

  newTransactionForm: FormGroup = new FormGroup({});

  loadingAccounts = false;
  loadingTransactions = false;
  newTransactionSending = false;

  constructor(
    private httpClient: HttpClient,
    private elasticRumService: ElasticRumService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.newTransactionForm = this.fb.group({
      'amount': [null, [ Validators.required ]]
    });

    this.loadAccounts();
  }

  public loadAccounts(): void {
    if (!this.loadingAccounts) {
      this.loadingAccounts = true;
      this.accounts = [];
      this.httpClient.get(`${environment.BANK_API_BASE}/account`).subscribe(data => {
        this.loadingAccounts = false;
        this.accounts = data as any[]; // TODO openapi

        if (this.accounts.length > 0) {
          this.loadTransactions(this.accounts[0]);
        }
      }, (err) => {
        this.loadingAccounts = false;
        console.error('error', err);

        const errMsg = 'Cannot load accounts!';
        this.snackBar.open(errMsg, 'Cancel', { duration: 3000 });
        throw Error(errMsg);
      });
    }
  }

  public loadTransactions(account: any): void {
    if (!this.loadingTransactions) {
      this.loadingTransactions = true;
      this.httpClient.get(`${environment.BANK_API_BASE}/account/${account.id}/transaction`).subscribe(transactions => {
        this.loadingTransactions = false;
        this.transactions = transactions as any[]; // TODO openapi
      }, (err) => {
        this.loadingTransactions = false;
        this.transactions = [];
        console.error('error', err);

        const errMsg = 'Cannot load transactions!';
        this.snackBar.open(errMsg, 'Cancel', { duration: 3000 });
        throw Error(errMsg);
      });
    }
  }

  public newTransactionSubmit(): void {
    if (!this.newTransactionSending) {
      this.newTransactionSending = true;

      const req = isNaN(parseInt(this.newTransactionForm.value.amount)) ?
        {
          'amount': 0,
          'amountAsString': this.newTransactionForm.value.amount
        } :
        {
          'amount': this.newTransactionForm.value.amount
        };

      this.httpClient.post(
        `${environment.BANK_API_BASE}/account/1/transaction`,
        req
      ).subscribe(() => {
        this.newTransactionSending = false;
      }, (err) => {
        this.newTransactionSending = false;
        console.error('error', err);

        const errMsg = 'Cannot create new transaction!';
        this.snackBar.open(errMsg, 'Cancel', { duration: 3000 });
        throw Error(errMsg);
      });
    }
  }
}
