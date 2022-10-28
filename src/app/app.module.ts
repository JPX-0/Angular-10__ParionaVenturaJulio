import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { ContainerComponent } from './components/container/container.component';
import { ListComponent } from './components/container/list/list.component';
import { AbmComponent } from './components/container/abm/abm.component';
import { SessionComponent } from './components/container/session/session.component';
import { FullNamePipe } from './pipes/full-name.pipe';
import { FontSizeDirective } from './directives/font-size.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MenuComponent,
    ContainerComponent,
    ListComponent,
    AbmComponent,
    SessionComponent,
    FullNamePipe,
    FontSizeDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
    FormsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
