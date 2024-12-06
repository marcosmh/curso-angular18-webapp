import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ProductoService } from "../services/producto.service";

@Component({
    selector: 'productos-list',
    templateUrl: '../views/productos-list.html',
    providers: [
        ProductoService
    ]
  })
export class ProductosListComponent {
    public titulo: string;
    public productos: any;
    public confirmado: number;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productoService: ProductoService
    ) {
        this.titulo = 'Listado de Productos';
        this.confirmado = 0;
    }

    ngOnInit() {
        console.log('productos-list.component.ts cargado.');
        this.listadoProductos();
    }

    getId() {
        let id: number = 0;
        this._route.params.forEach( (params: Params) => {
            id = params['id'];
        });
        console.log("id: ", id);
        return id;
    }

    listadoProductos() {
        this._productoService.getProductos().subscribe(
            result => {
                console.log("component productos: ");
                this.productos = result;
                console.log(this.productos);

                if(!this.productos) {
                    console.log("No se encontraron datos");
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    borrarConfirm(id: number) {
        this.confirmado = id;
    }

    cancelarConfirm() {
        this.confirmado = 0;
    }

    onDeleteProducto(id: number) {
        console.log('Component: borrar producto.');
        
        this._productoService.deleteProducto(id).subscribe(
            response => {
                console.log("ELIMINAR: [OK]"), response;
                this.listadoProductos();
            }, 
            error => {
                console.log(<any>error);
            }
        );
    }


}