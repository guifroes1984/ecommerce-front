import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(
    private productService: ProductService, 
    private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ): Observable<Product> {
    
    const id = route.paramMap.get("productId");

    if(id) {
      //então temos que buscar detalhes do back-end
      return this.productService.getProductDetailsById(id)
              .pipe(
                map(p => this.imageProcessingService.createImages(p))
              );
    } else {
      // retornar produto vazio observável
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId: null,
      productName: "",
      productDesciption: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: [],
    };
  }
}
