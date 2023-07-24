import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreadsModule } from './threads/threads.module';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UrlInterceptor } from './shared/url.interceptor';
import { LayoutComponent } from './layout/layout.component';
import { AsideNavComponent } from './layout/aside-nav/aside-nav.component';

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
      useClass: UrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
