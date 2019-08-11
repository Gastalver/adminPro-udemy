import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  // Valores por defecha.
  @Input() porcentaje = 50;
  // tslint:disable-next-line:no-input-rename
  @Input('nombre') leyenda = 'Leyenda';
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  // @ts-ignore
  @ViewChild('txtProgress') txtProgress: ElementRef;
  constructor() {
  }

  ngOnInit() {
    // console.log('Leyenda: ' + this.leyenda);
    // console.log('Porcentaje: ' + this.porcentaje);
  }
  onChanges(newValue: number) {
    // console.log(this.txtProgress.nativeElement.value);
    if (newValue >= 100 ) {
      this.porcentaje = 100;
    } else if (newValue <= 0 || newValue === null ) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);
  }
  cambiarValor(valor: number): void {
    if (this.porcentaje >= 100 && valor > 0 ) {
      this.porcentaje = 100;
      return;
    }
    if (this.porcentaje <= 0 && valor < 0 ) {
      this.porcentaje = 0;
      return;
    }
    this.porcentaje = this.porcentaje + valor;
    this.cambioValor.emit(this.porcentaje);
    this.txtProgress.nativeElement.focus();
  }
}
