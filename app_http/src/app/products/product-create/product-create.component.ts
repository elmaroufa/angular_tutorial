import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {

  @Output() added = new EventEmitter<Product>();

  productForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    price: new FormControl<number | undefined>(undefined, {
    nonNullable: true })
    });

  constructor(private productsService: ProductsService){

  }

  createProduct(){
    this.productsService.addProduct(this.name.value, Number(this.price.value)).subscribe(product => {
      this.productForm.reset();
      this.added.emit(product);
    })
  }

  get name() { return this.productForm.controls.name}
  get price() { return this.productForm.controls.price}

}
