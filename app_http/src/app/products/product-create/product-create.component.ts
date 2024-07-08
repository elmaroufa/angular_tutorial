import { Component, EventEmitter, Output } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { priceRangeValidator } from './price-range.directive';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {

  @Output() added = new EventEmitter<Product>();

  productForm = new FormGroup({
    name: new FormControl('', { 
      nonNullable: true,
      validators : Validators.required
    
    }),
    price: new FormControl<number | undefined>(undefined, {
    nonNullable: true,
    validators : [Validators.required, priceRangeValidator()]
  })
    });

  // productForm : FormGroup<{
  //   name : FormControl<string>,
  //   pricee : FormControl<number | undefined>
  // }> | undefined

  constructor(private productsService: ProductsService, private builder : FormBuilder){

  }

  createProduct(){
    this.productsService.addProduct(this.name.value, Number(this.price.value)).subscribe(product => {
      this.productForm.reset();
      this.added.emit(product);
    })
  }

  get name() { return this.productForm.controls.name}
  get price() { return this.productForm.controls.price}

  // private buildForm() {
  //   this.productForm = this.builder.nonNullable.group({
  //   name: this.builder.nonNullable.control(''),
  //   price: this.builder.nonNullable.control<number |
  //   undefined>(undefined, {})
  //   });
  // }

}
