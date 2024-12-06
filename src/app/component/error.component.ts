import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'error',
    templateUrl: '../views/error.html'
  })
export class ErrorComponent {
    public titulo: string;

    constructor() {
        this.titulo = "Error!! Página no encontrada.";
    }

    ngOnInit() {
        console.log("Ha ocurrido un Error al cargar el componente.");
    }
}