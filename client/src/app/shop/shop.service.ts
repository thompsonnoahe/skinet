import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators'
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private client: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.client.get<IPagination>(this.baseUrl + 'products', {
      observe: 'response',
      params: params
    })
      .pipe(
        map(response => response.body)
      );
  }

  getProduct(id: number) {
    return this.client.get<IProduct>(this.baseUrl + 'products/' + id.toString());
  }

  getBrands() {
    return this.client.get<IBrand[]>(this.baseUrl + 'products/brands');
  }

  getTypes() {
    return this.client.get<IType[]>(this.baseUrl + 'products/types');
  }
}
