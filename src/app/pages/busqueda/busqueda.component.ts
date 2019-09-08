// Dependencias
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {URL_API} from '../../config/config';

// Modelos
import {Usuario} from '../../models/usuario.model';
import {Hospital} from '../../models/hospital.model';
import {Medico} from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
public usuarios: Usuario[];
public hospitales: Hospital[];
public medicos: Medico[];
  constructor(
    public activatedRoute: ActivatedRoute,
    public servicioHTTP: HttpClient
  ) {
    activatedRoute.params.subscribe(
      (params) => {
        const termino = params.termino;
        console.log(termino);
        this.buscar(termino);
      }
    );
  }

  ngOnInit() {
  }
  buscar(termino: string) {
    // Llamamos al back end server desde aquí. No merece la pena crear un servicio porque sólo desde aquí haremos
    // este tipo de petición a la API.
    const url = URL_API + '/busqueda/general/' + termino;
    this.servicioHTTP.get(url).subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        this.usuarios = respuesta.usuarios;
        this.hospitales = respuesta.hospitales;
        this.medicos = respuesta.medicos;
      }
    );
  }
}
