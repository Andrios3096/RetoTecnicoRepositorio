import { ENDPOINTS } from './../shared/const/enpoints.enum';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { productDTO } from '../models/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(body:productDTO):Observable<productDTO>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH'
      })
    };

    console.log(body);
    
    return this.http.post<productDTO>(`api/${ENDPOINTS.PRODUCTS}/AddProduct`,body,httpOptions)
  }

  getProductAll():Observable<productDTO[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '/',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH'
      })
    };
    return this.http.get<productDTO[]>(`api/${ENDPOINTS.PRODUCTS}/GetAll`,httpOptions)
  }

  getProductById(guid:string):Observable<productDTO[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '/',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH'
      })
    };
    return this.http.get<productDTO[]>(`api/${ENDPOINTS.PRODUCTS}/GetProductById/${guid}`,httpOptions)
  }

  editProduct(body:productDTO):Observable<productDTO>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH'
      })
    };

    console.log(body);
    
    return this.http.put<productDTO>(`api/${ENDPOINTS.PRODUCTS}/UpdateProduct`,body,httpOptions)
  }

  deleteProduct(guid:string):Observable<productDTO>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE, PATCH'
      })
    };
console.log(`api/${ENDPOINTS.PRODUCTS}/DeleteProduct/${guid}`);

    return this.http.delete<productDTO>(`api/${ENDPOINTS.PRODUCTS}/DeleteProduct/${guid}`)
  }
}
