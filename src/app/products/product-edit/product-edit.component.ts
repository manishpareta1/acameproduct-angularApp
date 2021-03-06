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

 
  private dataIsValid: { [key: string]: boolean} ={};

  private currentProduct: Product;
  private originalProduct: Product;

  //changed the regular product variable with the getter and setter so that we can track the change in object
  //this will be helpful when we are using canDeactivate guard to find if the ther is unsaved data when user is
  //trying to navigate to other page from product edit or add product page. we will be able to generate warning/message
  //to user to notify about the unsaved work.
  //we have set current product to product in get method so in all the child component we are passing the
  //the reference of current procect.
  get product(): Product{ 
      return this.currentProduct;
  }

  //in this setter method we are cloning product object and setting it to original prduct so that we can use
  //it for future comparision when we have unsaved object when user is trying to move away from edit product page
  set product(value: Product){
    this.currentProduct = value;
    //clone the object to retain a copy
    this.originalProduct={...value};
  }

  //method to compare the object on edit page with the previos and new object.
  //it will compare the elements and if they have desired value undre those elements or not.
  get isDirty(): boolean{
    return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
  }

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(){
    //let id = +this.route.snapshot.paramMap.get('id');
    //this.getProduct(id);
    //Another way of fetching parameters from routes by using below method call.
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
    //calling reset method. this will help to avoid the error message when moving from edit page to
    //product list page.
    this.reset();
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

    reset(): void{
      this.dataIsValid = null;
      this.currentProduct = null;
      this.originalProduct = null;
    }
  
}
