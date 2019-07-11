import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginAuthService } from '../../services/authentication/loginauth.service'

@Injectable({
  providedIn: 'root'
})
export class StylistDesignerService {

  constructor(

    private http: HttpClient,
    private LoginAuthService :LoginAuthService

  ) { }




  getstylist_list() {
    return this.http.get(environment.baseUrl + '/api/v1/profile/list/stylist')
  }

  getdesigner_list() {
    return this.http.get(environment.baseUrl + '/api/v1/profile/list/designer')
  }
  
  getdesigner_detail(id) {
    return this.http.get(environment.baseUrl + '/api/v1/profile/list/designer/'+id)
  }

  getstylist_detail(id) {
    return this.http.get(environment.baseUrl + '/api/v1/profile/list/stylist/'+id)
  }

  getstylist_designer_product_list(id,offer,price_min,price_max,size,colour,category,subcategory,subsubcategory,ordering) {
    return this.http.get(environment.baseUrl + '/api/v1/profile/list/product/web/'+id +'?offer='+offer+
    '&price_min='+price_min+'&price_max='+price_max+'&size='+size+'&colour='+colour+'&category='+category+'&subcategory='+subcategory+'&subsubcategory='+subsubcategory+
    '&ordering='+ordering)

  }
  getproduct_detail(profile_id,id) {
    return this.http.get(environment.baseUrl + '/api/v1/profile/detail/product/'+profile_id+'/'+id+'/', this.LoginAuthService.get_header())
  }
  getProducts_images(product_id ,varient_id) {
    return this.http.get(environment.baseUrl +  '/api/v1/product/detail_by_colour/'+product_id+'/'+varient_id, this.LoginAuthService.get_header())
  }
  getproduct_detail_bycolour(profile_id,product_id,colour_id) {
    return this.http.get(environment.baseUrl + '/api/v1/profile/detail/product/bycolur/'+profile_id+'/'+product_id+'/'+colour_id, this.LoginAuthService.get_header())
  }
}