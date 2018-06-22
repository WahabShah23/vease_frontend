import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { google } from '@agm/core/services/google-maps-types';
declare var $: any;

@Component({
    selector: 'app-lead',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css', '../../../../../../node_modules/dragula/dist/dragula.css']

})
export class OrderComponent implements OnInit {
    lang: any;
    lat: any;
    model;
    lati: number = 51.678418;
    lng: number = 7.809007;
    formHidden = true;
    @ViewChild('search') public searchElementRef: ElementRef;
    constructor(private dragulaService: DragulaService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {

        // dragulaService.setOptions('bag-task1', {
        //     revertOnSpill: true
        //
        // });
        const bag: any = this.dragulaService.find('bag-task1');
        if (bag !== undefined) this.dragulaService.destroy('bag-task1');
        this.dragulaService.setOptions('bag-task1', {
            revertOnSpill: true
        });

        // dragulaService.setOptions('bag-task2', {
        //     revertOnSpill: true,
        //     moves: function (el, source, handle, sibling) {
        //         return true; // elements are always draggable by default
        //     },
        //     accepts: function (el, target, source, sibling) {
        //         return true; // elements can be dropped in any of the `containers` by default
        //     },
        //
        // });
    }

    public searchControl: FormControl;

    ngOnInit() {

        // for client
        // this.searchControl = new FormControl();
        // this.mapsAPILoader.load().then(() => {
        //     const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        //         types: ['address']
        //     });
        //     autocomplete.addListener('place_changed', () => {
        //         this.ngZone.run(() => {
        //             const place: google.maps.places.PlaceResult = autocomplete.getPlace();
        //             //  this.clientPlacess = place;
        //             // console.log(this.clientCity);

        //             //    for country
        //             var address_components = autocomplete.getPlace().address_components;

        //             if (place.geometry === undefined || place.geometry === null) {
        //                 return;
        //             }

        //             this.lat = place.geometry.location.lat();
        //             this.lang = place.geometry.location.lng();
        //             this.lati = this.lat;
        //             this.lng = this.lang;

        //         });
        //     });
        // });



        var text, counter = 0;
        $(document).on('click', '#add-service-request', function() {
            counter = counter + 1;
            text = $(this).closest('.m-portlet__head').next().find('.m-widget4').append(`
            <div class="m-widget4__item">
                            <div class="m-widget4__img m-widget4__img--logo">
                                <img src="./assets/app/media/img/client-logos/logo5.png" alt="">
                            </div>
                            <div class="m-widget4__info">
								<span class="m-widget4__title">
									New Item ` + counter + `
								</span>
                                <br>
                                <span class="m-widget4__sub">
									Make Metronic Great Again
								</span>
                            </div>
                            <span class="m-widget4__ext">
								<span class="m-widget4__number m--font-brand">
									+$2500
								</span>
							</span>
                        </div>
        `);

        });

    }

}
