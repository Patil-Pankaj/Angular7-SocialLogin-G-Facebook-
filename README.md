# SocialLogin 

[AOT](https://angular.io/guide/aot-compiler) Compatible.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Import the module

In `app.module.ts`,

```javascript
...


import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login'; 

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
	      provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
	      provider: new GoogleLoginProvider("Your-Google-Client-Id")
        },
      ];
  );
  return config;
}

@NgModule({
  imports: [
    ...
    SocialLoginModule
  ],
  providers: [
    ...
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [...]
})

export class AppModule { }

```

### Usage : 

In `login.component.ts`,

```javascript
import { Component, OnInit } from '@angular/core';  
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login';  
import { SocialLoginModule, AuthServiceConfig } from 'angular-6-social-login';  
import { Socialusers } from '../Models/socialusers'  
import { SocialloginService } from '../services/sociallogin.service';  
import { Router, ActivatedRoute, Params } from '@angular/router';  
@Component({ 
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  response;  
    socialusers=new Socialusers();  
  constructor(  
    public OAuth: AuthService,  
    private SocialloginService: SocialloginService,  
    private router: Router  
  ) { }  
  ngOnInit() {  
  }  
  public socialSignIn(socialProvider: string) {  
    let socialPlatformProvider;  
    if (socialProvider === 'facebook') {  
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;  
    } else if (socialProvider === 'google') {  
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;  
    }  
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {  
      console.log(socialProvider, socialusers);  
      console.log(socialusers);  
      this.Savesresponse(socialusers);  
    });  
  }  
  Savesresponse(socialusers: Socialusers) {  
    this.SocialloginService.Savesresponse(socialusers).subscribe((res: any) => {  
      debugger;  
      console.log(res);  
      this.socialusers=res;  
      this.response = res.userDetail;  
      localStorage.setItem('socialusers', JSON.stringify( this.socialusers));  
      console.log(localStorage.setItem('socialusers', JSON.stringify(this.socialusers)));  
      this.router.navigate([`/Dashboard`]);  
    })  
  }  
}
```



In `signin.component.html`,

```html
<h1>
     Sign in
</h1>

<button (click)="socialSignIn('facebook')">Sign in with Facebook</button>
<button (click)="socialSignIn('google')">Signin in with Google</button>              
```



### Facebook App Id : 

You need to create your own app by going to [Facebook Developers](https://developers.facebook.com/) page.
Add `Facebook login` under products and configure `Valid OAuth redirect URIs`.

### Google Client Id : 

Follow this official documentation on how to [
Create a Google API Console project and client ID](https://developers.google.com/identity/sign-in/web/devconsole-project).
