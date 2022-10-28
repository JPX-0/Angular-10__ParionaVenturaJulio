import { Pipe, PipeTransform } from '@angular/core';

/* 
  Pipe utilizada en las siguinte ruta:
  - "Clase-08-tarea\src\app\components\container\abm\abm.component.html"
*/
@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    return value.firstName + " " + value.lastName;
  }

}
