import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ManufacturerService } from '../../services/manufacturer/manufacturer.service'


declare var $:any;
@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  searchString;
  categories;
  products;
  noProduct=false;
  filters;
  p;

  sort_by='-qty_sold';
  discount='';
  size='';
  min_price='';
  max_price='';
  colour='';
  category ='';
  subcategory = '';
  subsubcategory='';


  view_product;
  stars;
  non_stars;

  constructor(
    private route: ActivatedRoute,
    private ManufacturerService :ManufacturerService

  ) { }
  
  ngOnInit() {
    $(".my-pagination").click(function() {
      $('html,body').animate({
          scrollTop: $(".second").offset().top},
          'slow');
      });
        
    this.route.params.subscribe(params => {
      this.searchString = params['searchString'];
      this.ManufacturerService.getSearchProduct_list(this.searchString,this.discount,this.min_price,this.max_price,this.size,this.colour,this.category,this.subcategory,this.subsubcategory,'-qty_sold').toPromise()
      .then(response => {
        console.log(response)
        this.products = response['products']
        this.filters = response['filters']

        // this.profile_detail = response['profile_detail']
      })

    });

  }
  setValue(type,value,status){
    if(type=='discount'){
      this.discount = value
    }
    if(type=='size'){
      if(status==true){
        this.size = this.size + value + ','
      }else{
        let new_value = value+','
        this.size = this.size.replace(new_value, '')
      }
    }
    if(type=='price'){
      if(status==true){

        if (value == 'above-5000'){
          let price = value.split('-')
          this.min_price = price[1]
          this.max_price = '500000'
        }else{
          let price_str = value.split('-')
          this.min_price = price_str[0]
          this.max_price = price_str[1]
        }    

      }else{
        this.min_price = ''
        this.max_price = ''
      }

    }
    if(type=='colour'){
      value = value.split('-')[1]
      if(status == true){
        this.colour = this.colour + value + ',' 
      }else{
        let new_value = value+','
        this.colour = this.colour.replace(new_value, '')
      }
    }
  }

  setCategory(status, category,subcategory,subsubcategory){

    if (status==true){
      this.category = this.category + category + ','
      this.subcategory = this.subcategory + subcategory + ','
      if(subsubcategory==undefined){
        this.subsubcategory = this.subsubcategory
      }else{
        this.subsubcategory  = this.subsubcategory + subsubcategory + ','
      }

    }else{
      let new_category = category+','
      this.category = this.category.replace(new_category, '')
      let new_subcategory = subcategory+','
      this.subcategory = this.subcategory.replace(new_subcategory, '')
      let new_subsubcategory = subsubcategory+','
      this.subsubcategory = this.subsubcategory.replace(new_subsubcategory, '')

    }

  }


  async onChange($event,category,subcategory,subsubcategory) {
  
    if ($event.target.name=='discount'){
      
      this.setValue('discount',$event.target.id, $event.target.checked) 
    }
  
    if ($event.target.name =='size'){
      this.setValue('size',$event.target.id, $event.target.checked)     
    }

    if ($event.target.name =='price'){
      this.setValue('price',$event.target.id, $event.target.checked)
      
    }
    if ($event.target.name =='sorting'){
      this.sort_by=$event.target.value
      
    }
    if ($event.target.name =='colour'){
      this.setValue('colour',$event.target.id, $event.target.checked)
      
    }
    if ($event.target.name =='category'){
      this.setCategory($event.target.checked,category,subcategory,subsubcategory)
      console.log(category,subcategory,subsubcategory)
      
    }
    if($event.currentTarget.id=='reset-all'){

      console.log('click')

      this.discount='';
      this.size='';
      this.min_price='';
      this.max_price='';
      this.colour='';
      this.category='';
      this.subcategory='';
      this.subsubcategory='';

    }
    console.log(this.size);
    console.log(this.discount);
    console.log(this.max_price,this.min_price,this.sort_by,this.colour);
   
    // console.log($event.target.name);
    // console.log($event.target.id);
    // console.log($event.target.value);

    this.route.params.subscribe(params => {
      this.searchString = params['searchString'];
      this.ManufacturerService.getSearchProduct_list(this.searchString,this.discount,this.min_price,this.max_price,this.size,this.colour,this.category,this.subcategory,this.subsubcategory,this.sort_by).toPromise()
      .then(response => {
        console.log(response)
        this.products = response['products']
        
      })

    });
    

  }


  view_product_detail(event){
    
    var id = event.currentTarget.id;
   
    console.log(id)

    this.ManufacturerService.getProducts_details(id).toPromise()
    .then(response => {
     
      this.view_product = response['product_detail'];
      this.stars = new Array(Math.round(response['product_detail'].avg_rating))
      this.non_stars = new Array(5 - Math.round(response['product_detail'].avg_rating))
      // this.view_profile = response['profile_data'];
      console.log(this.stars, this.non_stars)
      console.log(this.view_product)
  },

    )
  }


}
