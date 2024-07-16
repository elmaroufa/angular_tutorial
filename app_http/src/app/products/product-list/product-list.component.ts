import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnDestroy, OnInit, AfterViewInit {

  selectedProduct: Product | undefined;
  @ViewChild(ProductDetailComponent) productDetail: ProductDetailComponent | undefined;
  products$: Observable<Product[]> | undefined;
  private productsSub: Subscription | undefined;
  products = new MatTableDataSource<Product>([]);
  columnNames = ['name', 'price'];
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private productService: ProductsService) {}

  ngOnDestroy(): void {
    this.productsSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.getProducts();
    console.log(this.products);
  }

  ngAfterViewInit(): void {
    if (this.productDetail) {
      console.log(this.productDetail.product);
    }
  }

  onBuy() {
    window.alert(`You just bought ${this.selectedProduct?.name}!`);
  }

  private getProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = new MatTableDataSource(products);
      this.products.sort = this.sort;
      this.products.paginator = this.paginator;
    });
  }

  onAdd(product : Product){
    this.products.data.push(product);
  }
  
  onDelete() {
    this.products.data = this.products.data.filter(product => product !== this.selectedProduct);
    this.selectedProduct = undefined;
    }
}
