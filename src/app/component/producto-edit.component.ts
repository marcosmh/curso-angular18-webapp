import { Component } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { GLOBAL } from "../services/global";
import { ProductoService } from "../services/producto.service";
import { Producto } from "../models/producto";


@Component({
    selector: 'producto-edit',
    templateUrl: '../views/producto-add.html',
    providers: [
        ProductoService
    ]
  })
export class ProductoEditComponent {
    public titulo: string;
    public producto: Producto;
    public filesToUpload: any;
    public resultUpload: any;
    public is_edit: boolean;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productoService: ProductoService
    ) {
        this.titulo = 'Editar Producto';
        this.producto = new Producto(0,'','',0,'');
        this.is_edit = true;
    }

    ngOnInit() {
        console.log('producto-edit.component.ts cargado....');
        this.getProducto();
    }

    getId() {
        let id: number = 0;
        this._route.params.forEach( (params: Params) => {
            id = params['id'];
        });
        console.log("id: ", id);
        return id;
    }

    onSubmit() {
        console.log('Component: editar producto.');
        let id = this.getId();
        console.log("id: ", id);

        this._productoService.editProducto(id,this.producto).subscribe(
            response => {

                console.log("Respuesta: ",JSON.stringify(response));
                console.log("ID: ",id);
                console.log("filesToUpload: "+JSON.stringify(this.filesToUpload));

                console.log('Guardar la imagen');
                if(this.filesToUpload && this.filesToUpload.length > 0) {
                    this.saveImagen(id);
                } else {
                    console.log('no hay imagen para cargar');
                }
                
                console.log("EDITAR: [OK]");
                //this._router.navigate(['/productos']);
            }, 
            error => {
                console.log(<any>error);
            }
        );
        

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
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    saveImagen(id: number) {
        this._productoService.makeFileRequest(GLOBAL.url+"uploads/"+id,[],this.filesToUpload)
            .then(  (result) => {
                this.resultUpload = result;
                console.log(this.resultUpload.filename);
            },
            (error) => {
                console.log(error);
            }
        );
}


    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }


}