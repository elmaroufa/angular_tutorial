import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnChanges {

  @Input() product: Product | undefined;
  @Output() bought = new EventEmitter();
  @Output() deleted = new EventEmitter();
  
  constructor(private productService: ProductsService){}

  ngOnChanges(changes: SimpleChanges): void {
    const product = changes['product'];
    if (!product.isFirstChange()) {
      const oldValue = product.previousValue.name;
      const newValue = product.currentValue.name;
      console.log(`Product changed from ${oldValue} to ${newValue}`);
    }
  }

  buy() {
    this.bought.emit();
  }

  changePrice(product : Product, price: number){
    this.productService.updateProduct(product.id, price).subscribe(
      () => {
        alert(` the product with name ${product.name} was changed`)
      }
    )
  }
  remove(product:Product){
    this.productService.deleteProduct(product.id).subscribe(
         () => {this.deleted.emit();}  
    );
  }
}
