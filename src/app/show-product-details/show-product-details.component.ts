import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  productDetails: Product[] = [];
  displayedColumns: string[] = ['Id', 'Nome do produto', 'Descrição do produto', 'Preço com desconto do produto', 'Preço real do produto'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (resp: Product[]) => {
        console.log(resp);
        this.productDetails = resp;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}