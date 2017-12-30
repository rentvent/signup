import React, { Component } from "react";
import "jquery";

import "./Home.css";
import "../libs/font-awesome/css/font-awesome.css";
import "../libs/Ionicons/css/ionicons.css";
import "../libs/select2/css/select2.min.css";
import { signOutUser } from "../libs/awsLib";
import ReactGA from 'react-ga';

export default class Home extends Component {
   constructor(props) {
    super(props);
    console.log(props);
    // this.landlordObj = props.landlordObject;
    this.showMe = false;
    this.landlordObj = JSON.parse(sessionStorage.getItem('landlordObject'));
    this.landlordRatingStarArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];

    for (var j = 0; j < this.landlordObj.landlordReviews.length; j++){
          var item = this.landlordObj.landlordReviews[j];
        for(var i = 0; i < item.lrDescription.length; i++){
            if(item.lrDescription[i].LR_Type.toUpperCase() == "ADVICE"){
                item.adviceObj = item.lrDescription[i];
            } else if(item.lrDescription[i].LR_Type.toUpperCase() == "PRO"){
                item.proObj = item.lrDescription[i];
            } else if(item.lrDescription[i].LR_Type.toUpperCase() == "CON"){
                item.conObj = item.lrDescription[i];
            }
        }
    }
    

    this.landlordObj ? this.landlordObj.avgRating ? this.assignLandlordRatings(this.landlordObj.avgRating) : "" : "";

    if(!this.landlordObj){
      this.showMe = false;
      this.props.history.push("/");
    } else {
      this.showMe = true;
    }

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
    
    this.headerpanelClass = ["headerpanel-right d-lg-block d-none"];
    this.headerOption = true;

    this.houseImage1 = "https://s3.amazonaws.com/rentvent-web/1.jpg";
    this.houseImage2 = "https://s3.amazonaws.com/rentvent-web/2.jpg";
    this.houseImage3 = "https://s3.amazonaws.com/rentvent-web/3.jpg";
    this.houseImage4 = "https://s3.amazonaws.com/rentvent-web/4.jpg";
    this.houseImage5 = "https://s3.amazonaws.com/rentvent-web/5.jpg";
    this.houseImage6 = "https://s3.amazonaws.com/rentvent-web/6.jpg";
    this.profileImage1 = "https://s3.amazonaws.com/rentvent-web/7.jpg";
    this.profileImage2 = "https://s3.amazonaws.com/rentvent-web/8.jpg";
    this.profileImage3 = "https://s3.amazonaws.com/rentvent-web/9.jpg";

  }

  assignLandlordRatings = rating => {
    this.landlordRatingStarArray = [["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"],["icon ion-star"]];
    var ratings = Math.round(rating);
      for(var i=0; i<ratings; i++) {
        this.landlordRatingStarArray[i]=["icon ion-star tx-primary"];
      }
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  menuSelected() {
    if(this.headerOption == false) {
      this.headerpanelClass = ["headerpanel-right d-lg-block d-none"];
    } else {
      this.headerpanelClass = ["headerpanel-right d-lg-block"];
    }
    this.headerOption = !this.headerOption;
  }

  revealDisputes() {
    alert("Under development");
  }
  handleLogout = event => {
    signOutUser();
    sessionStorage.setItem('landlordObject', null);
    this.userHasAuthenticated(false);
    ReactGA.event({
            category: 'Navigation',
            action: 'Logout',
        });
    this.props.history.push("/");
  }

  handleReview = event => {
    ReactGA.event({
            category: 'Navigation',
            action: 'Questionnaire part 1',
        });
    this.props.history.push("/questionnaire1");
  }

  componentDidMount () {
      window.scrollTo(0, 0)
  }
  
  render() {

     var listItems = this.landlordObj.landlordReviews.map(function(item) {
      return (

        <div class="pd-y-30 bd-b">
                <div class="d-sm-flex justify-content-between mg-b-20 mg-sm-b-0">
                  <div>
                    <h6 class="tx-gray-800 tx-14 mg-b-5">A Renter <span class="tx-gray-600 tx-normal mg-l-2">in Vancouver, WA</span></h6>
                    <p>{item.lrCreatedDate}<a href="javascript:void(0)" class="mg-l-5 tx-gray-500"><i class="icon ion-ios-flag tx-16 lh-0"></i></a></p>
                  </div>
                  <div class="tx-sm-right">
                    <p class="mg-b-0">Rating</p>
                    <div class="lh-5 tx-16">
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                      <i class="icon ion-star tx-primary"></i>
                    </div>
                  </div>
                </div>
                {(() => {
                        if (item.proObj) {
                          return <div>
                          <div>
                          <label class="tx-bold tx-uppercase tx-12 tx-primary">Pros</label>
                          <p>{item.proObj.description}</p>
                          </div>
                          </div>;
                         } 
                      })()}

                      {(() => {
                        if (item.adviceObj) {
                          return <div>
                          <div>
                          <label class="tx-bold tx-uppercase tx-12 tx-primary">Advice</label>
                          <p>{item.adviceObj.description}</p>
                          </div>
                          </div>;

                         }  
                      })()}

                      {(() => {
                        if (item.conObj) {
                          return <div>
                          <div>
                          <label class="tx-bold tx-uppercase tx-12 tx-primary">Cons</label>
                          <p>{item.conObj.description}</p>
                          </div>
                          </div>;
                         }
                      })()}
                <div class="row row-xs">
                  <div class="col-sm">
                    <p class="mg-b-5">Approve Landlord?</p>
                    <p class="tx-success mg-b-0">Yes</p>
                  </div>
                </div>
              </div>

        : null
      );
    });

    return (
      this.showMe ? 
  <div>

    <div class="headerpanel">
      <div class="container">
        <div class="headerpanel-left">
          <div class="logo"><i class="icon ion-ios-home"></i></div>
          <h4>rentvent</h4>
        </div>
        <a href="#" class="headerpanel-navicon" onClick={this.menuSelected.bind(this)}><i class="icon ion-navicon-round"></i></a>
        <div class="headerpanel-right d-none d-lg-block" className={this.headerpanelClass.join('' )}>
          <ul class="nav">
            <li class="nav-item"><a href="javascript:void(0)" class="nav-link active">Home</a></li>
            <li class="nav-item"><a href="#" class="nav-link ash" onClick={this.handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="pd-t-10 pd-b-50">
      <div class="container">
        <nav aria-label="breadcrumb" role="navigation">
          <ol class="breadcrumb bg-transparent pd-x-0 tx-13">
            <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
            <li class="breadcrumb-item"><a href="javascript:void(0)">Landlords</a></li>
            <li class="breadcrumb-item active" aria-current="page">{this.landlordObj.firstName + " " + this.landlordObj.lastName}'s Profile</li>
          </ol>
        </nav>
        <div class="row">
          <div class="col-lg-8">
            <div class="profile-head">
              <div class="profile-head-left">
                <div class="d-sm-flex align-items-start">
                  <h2 class="tx-gray-900 tx-light">{this.landlordObj.firstName + " " + this.landlordObj.lastName}</h2>
                         
                  <div class="d-flex align-items-center mg-sm-l-20">
                    <div class="lh-5 tx-24">
                      <i className={this.landlordRatingStarArray[0].join('' )}></i>
                      <i className={this.landlordRatingStarArray[1].join('' )}></i>
                      <i className={this.landlordRatingStarArray[2].join('' )}></i>
                      <i className={this.landlordRatingStarArray[3].join('' )}></i>
                      <i className={this.landlordRatingStarArray[4].join('' )}></i>
                    </div> 
                    <span class="mg-l-10 tx-16">{this.landlordObj.avgRating}</span>
                  </div>
                </div>
                <p class="mg-b-0">{this.landlordObj.addressLine1 + ", " + this.landlordObj.addressLine2 + ", " + this.landlordObj.city + ", " + this.landlordObj.state
                  +", " + this.landlordObj.zipCode}</p>
              </div>
              <a href="#" class="btn btn-primary mg-t-20 mg-md-t-0" onClick={this.handleReview}><i class="icon ion-edit mg-r-10"></i>Write a Review</a>
            </div>

            <div class="d-flex mg-y-30">
              <div>
                <p class="mg-b-10">Phone Number</p>
                <h6 class="tx-lato tx-bold tx-14 tx-gray-800 mg-b-0">{this.landlordObj.phone}</h6>
              </div>
            </div>

            <p>Hi, my name is {this.landlordObj.firstName}... <a href="javascript:void(0)">Read more</a></p>

            <hr class="mg-y-25" />

            <div class="row">
              <div class="col-lg-6">

                <p class="mg-b-5 mg-t-30">Legal disputes history</p>
                <a href="#" class="btn btn-primary mg-t-20 mg-md-t-0" onClick={this.revealDisputes}>Reveal Disputes</a>

              </div>
            </div>

            <div class="review-header">
                 <h6 class="section-label mg-t-25 mg-b-15">Reviews (86)</h6>
              <div class="mg-t-15 mg-sm-t-0">
                <span>Sort by</span>
                <select class="select2">
                  <option value="1" selected>Newest First</option>
                  <option value="2">Oldest First</option>
                  <option value="3">Highest Rated</option>
                  <option value="2">Lowest Rated</option>
                </select>
              </div>
            </div>

            <div class="media-list">
                                         {listItems}

            </div>

          </div>
          <div class="col-lg-4 mg-t-40 mg-lg-t-0">
            <label class="tx-uppercase tx-medium tx-gray-700 mg-b-15">Owned Properties (2)</label>

            <div class="bd pd-20 bg-white mg-b-30">
              <div class="row no-gutters mg-b-20">
                <div class="col ht-100 pd-r-1-force"><img src={this.houseImage1} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-x-1-force"><img src={this.houseImage2} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-l-1-force"><img src={this.houseImage3} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
              </div>
              <p class="mg-b-5">2051 Norwalk Ave., Los Angeles CA, 90041</p>
            </div>

            <div class="bd pd-20 bg-white mg-b-30">
              <div class="row no-gutters mg-b-20">
                <div class="col ht-100 pd-r-1-force"><img src={this.houseImage4} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-x-1-force"><img src={this.houseImage5} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
                <div class="col ht-100 pd-l-1-force"><img src={this.houseImage6} alt="" class="wd-100p ht-100p object-fit-cover" /></div>
              </div>
              <p class="mg-b-5">2051 Norwalk Ave., Los Angeles CA, 90041</p>
            </div>

            <div class="mg-t-20 bd pd-25 tx-center">
              <p class="mg-b-5 tx-gray-800 tx-medium">Do you own or manage this property?</p>
              <a href="javascript:void(0)">Claim Your Profile</a>
            </div>

          </div>
        </div>
      </div>
    </div>
    </div>
    : null
    );
  }
}