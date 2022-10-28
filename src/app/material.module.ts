import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

const modules: any[] = [
  MatButtonModule,
  MatFormFieldModule,
  MatCardModule,
  MatInputModule,
  MatTableModule,
  MatIconModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
