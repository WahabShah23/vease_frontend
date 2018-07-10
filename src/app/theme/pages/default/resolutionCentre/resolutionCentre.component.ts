import { Component } from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
declare var $: any;

@Component({
    selector: 'resolution-centre',
    templateUrl: './resolutionCentre.component.html',
    styleUrls: ['./resolutionCentre.component.css']

})
export class ResolutionCentreComponent {
    complaints = true;
    cardClassActive = false;

    firstRowActive=false;
    secondRowActive=false;
    disputeRightSideActive = false;
    mainFilterHide = false;

    constructor(private _script: ScriptLoaderService) {

    }


    ngAfterViewInit() {

        this._script.loadScripts('resolution-centre',
            ['assets/app/js/services.js']);

    }
    activeRow(index:number)
    {
        this.disputeRightSideActive=true;

        if(index==1){
            this.secondRowActive=false;
            this.firstRowActive=true;
        }else{
            this.firstRowActive=false;
            this.secondRowActive=true;
        }
    }
}
