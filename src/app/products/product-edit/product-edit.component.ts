import { Component } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { Product, ProductResolved } from '../product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit{
  pageTitle = 'Product Edit';
  errorMessage: string;

  product: Product;
  private dataIsValid: { [key: string]: boolean} ={};

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(){
    //let id = +this.route.snapshot.paramMap.get('id');
    //this.getProduct(id);
    //Another way of fething parameters from routes by using below method call.
    //this returns an observable object, which is ment for tracking the change 
    //in param value and get the below code executed. We are using observable 
    //because navigation between edit and add product is getting tracked with 
    //the id passed in the URI, and hence Observable is the best to use to track
    //such changes and load the data immediatly.
    //commented below method as part of Route Resolver Changes.
    // this.route.paramMap.subscribe(
    //   params => {
    //     const id = +params.get('id');//'+' is used for casting string to int because id sent from url is a string and we need an integer.
    //     this.getProduct(id);
    //   }
    // )
    /** Route Resolver Change new way. */
    //we will use observable in place of snapshot way, because we have a navigation point on edit page
    // to add product which has same url, And Observable is used for traking the change in param and load
    //the data if there is any change.
    this.route.data.subscribe(data => {
        const resolvedData: ProductResolved = data['resolvedData'];
        this.errorMessage = resolvedData.error;
        this.onProductRetrieved(resolvedData.product);
    })    
  }

  /*Commented as part of Route Resolver Changes*/
  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe({
  //     next: product => this.onProductRetrieved(product),
  //     error: err => this.errorMessage = err
  //   });
  // }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(`${this.product.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  isValid(path?: string): boolean{
    this.validate();
    if(path){
      return this.dataIsValid[path];
    }else{
      return (this.dataIsValid &&
        Object.keys(this.dataIsValid).every(d=> this.dataIsValid[d]=== true));
    }
  }

  saveProduct(): void {
    if (this.isValid()) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }

    
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the product list
    this.router.navigate(['products']);
  }

  validate(): void{
    //Clear Validation object
    this.dataIsValid = {};

    //'info' tab
    if(this.product.productName &&
      this.product.productCode.length >=3 &&
      this.product.productCode){
        this.dataIsValid['info'] = true;
      }else{
        this.dataIsValid['info'] = false;
        }
      

      //'tags' tab
    if(this.product.category &&
      this.product.category.length >=3){
        this.dataIsValid['tags'] = true;
      }else{
        this.dataIsValid['tags'] = false;
        }
      }
  
}
