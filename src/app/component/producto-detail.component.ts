import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ProductoService } from "../services/producto.service";
import { Producto } from "../models/producto";


@Component({
    selector: 'productos-detail',
    templateUrl: '../views/producto-detail.html',
    providers: [
        ProductoService
    ]
  })
export class ProductoDetailComponent {

    public titulo: string;
    public producto: Producto;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productoService: ProductoService
    ) {
        this.titulo = 'Detalle Producto';
        this.producto = new Producto(0,'','',0,'');
    }


    ngOnInit() {
        console.log('producto-detail.component.ts cargado....');
        this.getProducto();
    }

    getProducto() {
        console.log("component: getProducto: ");
        let id: number = 0;
        this._route.params.forEach( (params: Params) => {
            id = params['id'];
        });
        console.log("id: ", id);

        this._productoService.getProducto(id).subscribe(
            result => {
                console.log(JSON.stringify(result));
                if(this.producto) {
                    this.producto = result;
                } else {
                    console.log("No se encontraron datos");
                    //this._router.navigate(['/productos']);
                }
            },
            error => {
                console.log(error);
            }
        )
    }

}