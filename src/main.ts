import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';

import { AppRoutingModule } from './app/app-routing.module';

import { ReIssueToken } from './app/auth/re-issue-token.interceptor';
import { TokenAndUrlInterceptor } from './app/shared/token-url.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(BrowserAnimationsModule),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenAndUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ReIssueToken,
      multi: true,
    },
  ],
});
