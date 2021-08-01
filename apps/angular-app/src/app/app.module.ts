import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { CreditCardMaskPipe } from './pipes/credit-card-mask.pipe';
import { ElasticRumService } from './services/elastic-rum.service';

@NgModule({
  declarations: [
    AppComponent,
    CreditCardMaskPipe
  ],
    imports: [
      BrowserModule,
      RouterModule.forRoot([], {initialNavigation: 'enabledBlocking'}),
      HttpClientModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,

      // 3th party
      MatBadgeModule,
      MatButtonModule,
      MatCardModule,
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      MatProgressSpinnerModule,
      MatSnackBarModule
    ],
  providers: [
    { provide: ErrorHandler, useClass: ElasticRumService }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
