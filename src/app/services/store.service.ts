import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Product } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  dataUrl: string = 'assets/data.json';

  //lista del carrito
  private myList: Product[] = [];

  //observable carrito
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.dataUrl);
  }

  //aniadir producto
  addProduct(product: Product) {

    
    if (this.myList.length === 0) {
      product.cantidad = 1;
      this.myList.push(product);
      this.myCart.next(this.myList);

    } else {
      const productMod = this.myList.find((element) => {
        return element.id === product.id
      })
      if (productMod) {
        productMod.cantidad = productMod.cantidad + 1;
        this.myCart.next(this.myList);
      } else {
        product.cantidad = 1;
        this.myList.push(product);
        this.myCart.next(this.myList);
      }

    }
  }

  findProductById(id: string) {
    return this.myList.find((element) => {
      return element.id === id
    })

  }

  deleteProduct(id: string) {

    this.myList = this.myList.filter((product) => {
      return product.id != id
    })
    this.myCart.next(this.myList);


  }
  totalCart() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.cantidad * product.price); }, 0)
    return total
  }
}


