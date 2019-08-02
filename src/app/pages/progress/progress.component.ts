import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  porcentaje1 = 20;
  porcentaje2 = 50;
  constructor() { }

  ngOnInit() {
  }
  actualizar( event: number) {
    console.log('Recibido evento: ' + event);
    // this.porcentaje1 = event;
  }
  }
