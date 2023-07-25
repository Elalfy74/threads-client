import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { ThreadsModule } from './threads/threads.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AsideNavComponent } from './layout/aside-nav/aside-nav.component';

import { TokenAndUrlInterceptor } from './shared/token-url.interceptor';
import { ReIssueToken } from './auth/re-issue-token.interceptor';

@NgModule({
  declarations: [AppComponent, LayoutComponent, AsideNavComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ThreadsModule,
    AuthModule,
    HttpClientModule,
  ],
  providers: [
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
  bootstrap: [AppComponent],
})
export class AppModule {}
