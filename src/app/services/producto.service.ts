import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/internal/operators/map";
import { catchError, Observable, of, throwError } from "rxjs";
import { Producto } from "../models/producto";
import { GLOBAL } from "./global";

@Injectable()
export class ProductoService {

    public url: string;
    
    constructor(
        private _http: HttpClient
    ) {
        this.url = GLOBAL.url;
    }

    
    getProductos(): Observable<any> {
        console.log("getProductos: ");
        console.log(
            this._http.get<any>(this.url+'productos').subscribe(
                result => { console.log(result) },
                error => { console.log(error); })
        );

        return this._http.get<any>(this.url+'productos').pipe(
                map(response => {
                    console.log("Servicio Producto: ");
                    console.log(response);
                    return response;
                }));
    }

    getProducto(id: number): Observable<any> {
        console.log("servive: getProducto: ", id);
        return this._http.get<any>(this.url+'productos/'+id).pipe(
            map(response => {
                JSON.stringify(response);
                return response;
            }));

    }

    addProducto(producto: Producto) {
        console.log("addProducto: ");
        let json = JSON.stringify(producto);
        let headers = new HttpHeaders({
            'Content-type':'application/json'
        });
        
        return this._http.post<Producto>(this.url+'productos', json, { headers })
            .pipe(
              map(response => {
                console.log("El Producto se ha guardado correctamente:", response);
                return response;
              })
              ,catchError(error => {
                console.log("Error al guardar el  producto: ", error);
                return (error);
              })
            );
    }

    editProducto(id: number,producto: Producto) {
        console.log("service::editProducto: ", id);
        let json = JSON.stringify(producto);
        let headers = new HttpHeaders({
            'Content-type':'application/json'
        });

        return this._http.put<Producto>(this.url+'productos/'+id, json, { headers })
            .pipe(
              map(response => {
                console.log("El Producto se ha editado correctamente:", response);
                return response;
              })
              ,catchError(error => {
                console.log("Error al editar el  producto: ", error);
                return (error);
              })
            );
    }

    deleteProducto(id: number) {
        console.log("service::deleteProducto: ", id);
       
        return this._http.delete(this.url+'productos/'+id)
        .pipe(
            map(response => {
              console.log("El Producto se ha eliminado correctamente:", response);
              return response;
            })
            ,catchError(error => {
              console.log("Error al eliminar el  producto: ", error);
              return (error);
            })
          );
    } 


    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise( (resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++) {
                formData.append('uploads[]', files[i], files[i].name);
            }

            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    if( xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                } else{
                    reject(xhr.response);
                }
            };
            xhr.open('POST',url, true);
            xhr.send(formData);

        });
    }

}