import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ProductoService } from "../services/producto.service";
import { Producto } from "../models/producto";
import { GLOBAL } from "../services/global";

@Component({
    selector: 'producto-add',
    templateUrl: '../views/producto-add.html',
    providers: [
        ProductoService
    ]
  })
export class ProductoAddComponent {
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
        this.titulo = 'Crear un Productos';
        this.producto = new Producto(0,'','',0,'');
        this.is_edit = false;
    }

    ngOnInit() {
        console.log('producto-add.component.ts cargado.');
    }

    onSubmit() {
        console.log('Component: crear producto.');
        var id = 0;

        this._productoService.addProducto(this.producto).subscribe(
            response => {
                let data = JSON.stringify(response);
                let parsedData = JSON.parse(data);
                id = parsedData.id;

                console.log("Respuesta: ",JSON.stringify(response));
                console.log("ID: ",id);
                console.log("filesToUpload: "+JSON.stringify(this.filesToUpload));

                if(this.filesToUpload && this.filesToUpload.length > 0) {
                    console.log('entro a cargar la imagen');
                    this.saveImagen(id);
                } else {
                    console.log('no hay imagen para cargar');
                }
                
                this._router.navigate(['/productos']);
            }, 
            error => {
                console.log(<any>error);
            }
        );
     
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