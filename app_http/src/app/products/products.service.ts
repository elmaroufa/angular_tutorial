import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from './product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface ProductDTO {
  id: number;
  title : string;
  price : number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = 'https://fakestoreapi.com/products';

  private products = [
    {
      name: 'Webcam',
      price: 100
    },
    {
      name:  'Microphone',
      price: 200
    },
    {
      name: 'Wireless keyboard',
      price: 85
    }
  ];

  private convertToProduct(product: ProductDTO): Product
  {
    return {
      id: product.id,
      name : product.title,
      price: product.price
    }
  }

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {

    const options = {
      headers: new HttpHeaders({ Authorization: 'myAuthToken' })
      };

    return this.http.get<ProductDTO[]>(this.productsUrl, options).pipe(
      map(products => products.map(product => {
        console.log(product);
        return this.convertToProduct(product)
      }))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<ProductDTO>(`${this.productsUrl}/${id}`).pipe(
    map(product => this.convertToProduct(product))
    )
  }

  addProduct(name: string, price: number): Observable<Product> {
    return this.http.post<ProductDTO>(this.productsUrl, {
        title: name,
        price: price
      }).pipe(
      map(product => this.convertToProduct(product))
    )
  }

  updateProduct(id: number, price: number) : Observable<void> {
      return this.http.patch<void>(`${this.productsUrl}/${id}}`, {price})
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`);
  }
    

}
