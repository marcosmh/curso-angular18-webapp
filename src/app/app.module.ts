import { NgModule } from '@angular/core';
import { BrowserModule,provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { routing, appRoutingProviders } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home.component';
import { ErrorComponent } from './component/error.component';
import { ProductosListComponent } from './component/productos-list.component';
import { ProductoAddComponent } from './component/producto-add.component';
import { ProductoDetailComponent } from './component/producto-detail.component';
import { ProductoEditComponent } from './component/producto-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    ProductosListComponent,
    ProductoAddComponent,
    ProductoDetailComponent,
    ProductoEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [
    provideClientHydration(),
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
