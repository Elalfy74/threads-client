import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';

import { AppRoutingModule } from './app/app-routing.module';

// Interceptors
import { ReIssueTokenInterceptor } from './app/auth/re-issue-token.interceptor';
import { TokenAndUrlInterceptor } from './app/shared/token-url.interceptor';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { threadsReducer } from './app/threads/store/threads.reducer';
import { ThreadsEffects } from './app/threads/store/threads.effects';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(AppRoutingModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(StoreModule.forRoot({ threads: threadsReducer })),
    importProvidersFrom(EffectsModule.forRoot([ThreadsEffects])),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenAndUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ReIssueTokenInterceptor,
      multi: true,
    },
  ],
});
