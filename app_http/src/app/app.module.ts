import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth2.interceptor';
import { authInterceptor } from './auth/auth.interceptor';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';




@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    ProductsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatToolbarModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
