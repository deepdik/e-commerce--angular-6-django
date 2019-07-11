import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from '../../services/authentication/loginauth.service'
import { ManufacturerService } from '../../services/manufacturer/manufacturer.service'
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  login;
  category_list;
  searchString=""
  constructor(
    private LoginAuthService :LoginAuthService,
    private ManufacturerService :ManufacturerService,
    private router:Router



  ) { }

  ngOnInit() {


    if(this.LoginAuthService.isLoggednIn()){
      this.login = true

    }else{
      this.login = false

    }
    // this.ManufacturerService.getcategory_list().toPromise()
    // .then(response => {
    //   console.log(response)
    //   this.category_list = response

    // })
    
    $("body").on('scroll', function() {
      if($("body").scrollTop() >=300) {
        $('#headerWrapper').addClass("stick");
      }else{
        $('#headerWrapper').removeClass("stick");	
      }
    });

    $( '.dropdown' ).each(function() {
      var _this = $( this );
      $( this ).find('a').on( 'click', function(e) {
        e.preventDefault();
        $( _this ).toggleClass( 'open' );
        var value = $( this ).text();
        $( _this ).find( '> ul > li > a' ).text( value );
      });
    });
    $('html').on( 'click', function(e) {
      if( $( e.target ).closest('.dropdown.open').length == 0 ) {
        $( '.dropdown' ).removeClass('open');
      }
    });

    $('.mobileBtn').on('click', function(){
      $(this).toggleClass('active');
      $('.mobile-menu-area').slideToggle();
    });

    $('.mobile-menu-area li a').on('click', function(){
      $('.mobileBtn').removeClass('active');
      $('.mobile-menu-area').slideUp();
    });

  }
  logout(){
    this.LoginAuthService.logout()
    let login = 'false'
  }

  doSearch(){
    console.log(this.searchString)
    if (this.searchString==''){
      return false;
    }
    this.router.navigate(['/product/search/', this.searchString]);

  }
}
