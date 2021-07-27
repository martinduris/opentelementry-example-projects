import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { ElasticRumService } from './services/elastic-rum.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    BrowserAnimationsModule,

    // 3th party
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: ElasticRumService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
