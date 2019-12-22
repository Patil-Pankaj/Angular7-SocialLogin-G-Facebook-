import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export function socialConfigs() {  
  const config = new AuthServiceConfig(  
    [  
      {  
        id: FacebookLoginProvider.PROVIDER_ID,  
        provider: new FacebookLoginProvider('app -id')  
      },  
      {  
        id: GoogleLoginProvider.PROVIDER_ID,  
        provider: new GoogleLoginProvider('app-id')  
      }  
    ]  
  );  
  return config;  
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers:  [  
    AuthService,  
    {  
      provide: AuthServiceConfig,  
      useFactory: socialConfigs  
    }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
