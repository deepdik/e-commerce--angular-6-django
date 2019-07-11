import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../services/authentication/login.service';
import { LoginAuthService } from '../../services/authentication/loginauth.service'
declare var $: any;
declare var swal:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstname;
  lastname;
  email;
  phonenumber;
  countrycode;
  gender;
  profileForm: FormGroup;
  submitted =false;
  errormessage;


  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private LoginService: LoginService,
    private LoginAuthService :LoginAuthService,
    private formBuilder: FormBuilder 


  ) { }

  ngOnInit() {

    this.LoginService.getProfile().toPromise()
    .then(response => {
      console.log(response)
      this.firstname = response['user_other_data']['first_name']
      this.lastname = response['user_other_data']['last_name']
      this.email = response['user_other_data']['email']
      this.phonenumber = response['phonenum']
      this.countrycode = response['country_code']
      this.gender = response['gender']

    })
    .catch(console.log);
    
    this.profileForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.minLength(6)]],
      countrycode: ['', Validators.required],
      gender:['']
      });

    $('#radioBtn a').on('click', function(){
      // alert('hello');
      $('#radioBtn a').removeClass('active').addClass('notActive');
      $(this).removeClass('notActive').addClass('active');
    });

  }

  get f() { return this.profileForm.controls; }

  changegender(event){
    console.log(event.target.id)
    this.gender = event.target.id

  }




  async changeProfile() {
    this.submitted = true;

    if (this.profileForm.invalid) {
      
      return;
    }

    this.LoginService.updateProfile({
      phonenumber:this.phonenumber,
      countrycode:this.countrycode,
      firstname:this.firstname,
      lastname:this.lastname,
      email:this.email,
      gender:this.gender
    }).subscribe(response=>{
      console.log(response);
      
      swal("Welcome!", "You Profile Change Successfully", "success");
      this.LoginService.getProfile().toPromise()
      .then(response => {
        console.log(response)
        this.firstname = response['user_other_data']['first_name']
        this.lastname = response['user_other_data']['last_name']
        this.email = response['user_other_data']['email']
        this.phonenumber = response['phonenum']
        this.countrycode = response['country_code']
        this.gender = response['gender']
  
      })
      .catch(console.log);

    },error=>{
      this.loginError(error.error.message); 
    });
  }
  loginError(e) {
    console.log(e);
    
    this.errormessage = e;
    setTimeout(() => {
      this.errormessage = "";
    }, 4000);
  }

}
