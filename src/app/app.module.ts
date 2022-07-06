import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RegisterModule } from './features/register/register.module';
import { SettingsModule } from './features/settings/settings.module';
import { LoginModule } from './features/login/login.module';
import { NewsFeedModule } from './features/newsFeed/news-feed.module';
import { AdminModule } from './features/admin/admin.module';
import { ProfileModule } from './features/profile/profile.module';
import { AppRoutingModule } from './app-routing.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './core/interceptor.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    LoginModule,
    RegisterModule,
    SettingsModule,
    // NewsFeedModule,
    AdminModule,
    ProfileModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavbarModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
