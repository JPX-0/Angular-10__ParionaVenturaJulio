import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

/* 
  Directiva utilizada en las siguintes rutas:
  - "Clase-08-tarea\src\app\components\layout\toolbar\toolbar.component.html"
  - "Clase-08-tarea\src\app\components\container\abm\abm.component.html"
*/
@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective implements OnInit {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement, "font-size", "20px")
  }

}
