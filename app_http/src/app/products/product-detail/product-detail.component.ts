import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnChanges, OnInit {

  @Input() product: Product | undefined;
  @Output() bought = new EventEmitter();
  @Output() deleted = new EventEmitter();
  product$: Observable<Product> | undefined;
  @Input() id = -1;
  price : number | undefined;
  
  constructor(private productService: ProductsService, public authService: AuthService,
    private route : ActivatedRoute){}

  ngOnInit(): void {
    // const id = this.product$ = this.route.snapshot.params['id'];
    // this.product$ = this.productService.getProduct(id);
    this.product$ = this.route.data.pipe(
      switchMap(data => of(data['product']))
      );
  }

  ngOnChanges(): void {
    this.product$ = this.productService.getProduct(this.id);
    }
  
  buy() {
    this.bought.emit();
  }

  changePrice(product: Product, price: number) {
    this.productService.updateProduct(product.id, price).subscribe(() => {
      alert(`The price of ${product.name} was changed!`);
    });
  }

  remove(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.deleted.emit();
    });
  }
}
