import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ManufacturerService } from '../../services/manufacturer/manufacturer.service'

import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

declare var $:any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product;
  id;

  profile_id;
  profile;
  best_selling;
  colour_and_images;
  product_stars;
  product_non_stars;


  view_product;
  stars;
  non_stars;

  constructor(
    private ManufacturerService :ManufacturerService,
    private route: ActivatedRoute,
    private router:Router
  ) { 

      this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
      }
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.id = params['id'];

      this.ManufacturerService.getProducts_details(this.id).toPromise()
      .then(response => {
        this.product = response['product_detail'];
      
        this.colour_and_images = response['product_detail']['colour_and_images'];
        this.profile = response['profile_data'];
        this.best_selling = response['best_selling'];

        this.product_stars = new Array(Math.round(response['product_detail'].avg_rating))
        this.product_non_stars = new Array(5 - Math.round(response['product_detail'].avg_rating))
        // console.log(this.best_selling.length)
        // console.log(this.best_selling)
        setTimeout(function(){

          $(".product-curosel").owlCarousel({
            autoPlay: true,
            loop: true,
            slideSpeed:3000,
            pagination:false,
            navigation:true,
            items : 4,
            // /* transitionStyle : "fade", */    /* [This code for animation ] */
            navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            itemsDesktop : [1199,4],
            itemsDesktopSmall : [980,3],
            itemsTablet: [767,1],
            itemsMobile : [479,1],
          });


        },100);
  
        $('.zoomSlide').imagesLoaded( function() {
          $("#exzoom").exzoom({
                autoPlay: false,
            });
          $("#exzoom").removeClass('hid_den');
          setTimeout(function(){
            $('.exzoom_nav_inner').find('span').removeClass('current') 
            $('.exzoom_nav_inner').find('span:first').addClass('current')
            let img_url = $('.exzoom_img_ul').find('li:first img').attr('src')
            $('.exzoom_preview_img').attr('src' ,img_url);
  

          },1000)
          
        });

      });
    
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

  getImages(product_id,varient_id){
    this.colour_and_images = [];
    this.ManufacturerService.getProducts_images(product_id,varient_id).toPromise()
    .then(response => {
      debugger
      $(".exzoom_nav_inner").empty()
      debugger
      this.colour_and_images = response['colour_and_images'];
  
    })
  }

}
