import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StylistDesignerService } from '../../services/stylist-designer/stylist-designer.service'
declare var $:any;
import {LoaderService } from '../../comman/loader/loader.service'
@Component({
  selector: 'app-product-detail-by-colour',
  templateUrl: './product-detail-by-colour.component.html',
  styleUrls: ['./product-detail-by-colour.component.css']
})
export class ProductDetailByColourComponent implements OnInit {
  product;
  product_id;
  colour_id;
  view_product;
  view_profile
  id;
  profile_id;
  action;
  profile;
  best_selling;
  stars;
  non_stars;
  product_stars;
  product_non_stars;
  colour_and_images;

  constructor(
    private StylistDesignerService :StylistDesignerService,
    private route: ActivatedRoute,
    private router:Router,
    private LoaderService:LoaderService

  ) { 

    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
   }
  }
  ngOnInit() {

    this.route.params.subscribe(params => {

      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.profile_id = params['profile_id'];
      this.product_id = params['product_id'];
      this.colour_id = params['colour_id'];

      this.StylistDesignerService.getproduct_detail_bycolour(this.profile_id, this.product_id ,this.colour_id).toPromise()
      .then(response => {
        this.product = response['product_detail'];
        this.colour_and_images = response['product_detail']['colour_and_images'];
        this.profile = response['profile_data'];
        this.best_selling = response['best_selling'];
        this.product_stars = new Array(Math.round(response['product_detail'].avg_rating))
        this.product_non_stars = new Array(5 - Math.round(response['product_detail'].avg_rating))

        console.log(this.best_selling.length)
        console.log(this.best_selling)
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
        // $('.exzoom_nav_inner').find('span').removeClass('current') 
        // $('.exzoom_nav_inner').find('span:first').addClass('current')
        // let img_url = $('.exzoom_img_ul').find('li:first img').attr('src')
        // $('.exzoom_preview_img').attr('src' ,img_url);
      });


    });

  }

  view_product_detail(event){
    // this.LoaderService.show()
    var id = event.currentTarget.id;
   
    console.log(id)

    this.StylistDesignerService.getproduct_detail(this.profile_id,id).toPromise()
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

