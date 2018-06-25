import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Helpers } from '../../../../helpers';


@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {

    profileSectionHidden:boolean
    securitySectionHidden:boolean
    paymentSectionHidden:boolean

    constructor() {

    }
    ngOnInit() {
        this.profileSectionHidden=false;
        this.securitySectionHidden=true;
        this.paymentSectionHidden=true;
    }

    changingRightTabStatus(value:string){
        if(value=="profile")
        {
            this.profileSectionHidden=false;
            this.securitySectionHidden=true;
            this.paymentSectionHidden=true;
        }else if(value=="Security"){
            this.profileSectionHidden=true;
            this.securitySectionHidden=false;
            this.paymentSectionHidden=true;
        }else{
            this.profileSectionHidden=true;
            this.securitySectionHidden=true;
            this.paymentSectionHidden=false;
        }
    }
}