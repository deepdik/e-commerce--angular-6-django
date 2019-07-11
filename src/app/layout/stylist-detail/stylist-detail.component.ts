import { Component, OnInit } from '@angular/core';
import { StylistDesignerService } from '../../services/stylist-designer/stylist-designer.service'
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-stylist-detail',
  templateUrl: './stylist-detail.component.html',
  styleUrls: ['./stylist-detail.component.css']
})
export class StylistDetailComponent implements OnInit {
  stylist;
  id;

  view_product;
  stars;
  non_stars;

  constructor(
    private StylistDesignerService :StylistDesignerService,
    private route: ActivatedRoute,
    private router:Router

  ) { }

  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // $('a, button').on('click', function(){
    //   $('html, body').animate({
    //     scrollTop: 0
    //   }, 500);
    // });


    $("[data-background]").each(function () {
      $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    });

    // mainSlider
    function mainSlider() {
      var BasicSlider = $('.slider-active');
      BasicSlider.on('init', function (e, slick) {
        var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);
      });
      BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);
      });
      BasicSlider.slick({
        autoplay: true,
        autoplaySpeed: 10000,
        dots: true,
        fade: true,
        arrows: false,
        responsive: [
          { breakpoint: 767, settings: { dots: false, arrows: false } }
        ]
      });

      function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function () {
          var $this = $(this);
          var $animationDelay = $this.data('delay');
          var $animationType = 'animated ' + $this.data('animation');
          $this.css({
            'animation-delay': $animationDelay,
            '-webkit-animation-delay': $animationDelay
          });
          $this.addClass($animationType).one(animationEndEvents, function () {
            $this.removeClass($animationType);
          });
        });
      }
    }
    mainSlider();

    ////////////////

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.StylistDesignerService.getstylist_detail(this.id).toPromise()
    .then(response => {
      console.log(response['stylist'])
      this.stylist = response['stylist']
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
    
      },100)

    })


  }
  showAllProduct(){
    this.router.navigate(['/product-list/', this.id]);

      
  }


  view_product_detail(event){
    
    var id = event.currentTarget.id;
   
    console.log(id)

    this.StylistDesignerService.getproduct_detail(this.stylist.id,id).toPromise()
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
