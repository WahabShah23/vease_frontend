import { Component } from '@angular/core';
declare var $: any;

@Component({
    selector: 'create-dispute',
    templateUrl: './createDispute.component.html',
    styleUrls: ['./createDispute.component.css']

})
export class CreateDisputeComponent {
    complaints = true;
    cardClassActive = false;
}
