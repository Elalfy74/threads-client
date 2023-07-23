import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreadsModule } from './threads/threads.module';
import { AuthModule } from './auth/components/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ThreadsModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
