import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { FormControl, FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';
import { priceRangeValidator } from './price-range.directive';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent implements OnInit{


  showPriceRangeHint = false;
  @Output() added = new EventEmitter<Product>();
  products : Product[] = [];
  products$: Observable<Product[]> | undefined;
  categories = ['Hardware', 'Computers', 'Clothing', 'Software'];
  
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
  ngOnInit(): void {
    this.price.valueChanges.subscribe(price => {
        if(price){
          this.showPriceRangeHint = price > 1 && price < 10000
        }
    });

    this.productsService.getProducts().subscribe(products => {
       this.products = products;
    });

    this.products$ = this.name.valueChanges.pipe(
      map(name => this.products.filter(product => product.name.
      startsWith(name)))
      );
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
