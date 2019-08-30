import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductResolved } from './product';
import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
providedIn: 'root'
})


export class ProductResolver implements Resolve<ProductResolved>{

    constructor(private productService: ProductService){

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved>{
        const id = route.paramMap.get('id');
        //adding error hadeling in case if the product is not found or its an incorrect
        //data formate        
        if(isNaN(+id)){
            const message = 'Proudct Id is not a number: '+ id;
            console.error(message);
            return of({ product: null, error: message});
        }
        return this.productService.getProduct(+id)
        .pipe(
            map(product => ({product: product})),
            catchError(error =>{
                const message = 'Retreival error:' + error;
                console.error(message);
                return of({ product: null, error: message});
            })
            );

    
    }

}