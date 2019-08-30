import { Component } from '@angular/core';

import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  //added ActivatedRoute to read the parameter passed in the url
  //**** Route Resolver change*** commented Productservice as part of Route Resolver changes.
  //dont need this service to load the produt details when we navigate to product detail compoenent.
  //we are doing this using Route Resolver.
  constructor(/*private productService: ProductService,*/ private route: ActivatedRoute) { }

  ngOnInit(){
    //used snapshot object to get the passed parameter
    //we can use observable(route.paramMap.subscribe()) as well of route to read the parameter value
    //the keyword passed to get() should match to the keyword defined in the route url in component
    //********/Route Resolver change******
    //let id= +this.route.snapshot.paramMap.get('id');
    //this.getProduct(id);
    const resolvedData: ProductResolved = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }
  //********Route Resolver change******
  // getProduct(id: number) {
  //   this.productService.getProduct(id).subscribe({
  //     next: product => this.onProductRetrieved(product),
  //     error: err => this.errorMessage = err
  //   });
  // }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
