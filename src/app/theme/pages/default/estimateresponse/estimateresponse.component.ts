import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { AgmMap } from '@agm/core';
import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';

import { Subject } from 'rxjs';
import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent
} from 'angular-calendar';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

import { ServerServices_Services } from '../../../../services/serverServices.services';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


// serverServices for posting the data to server

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

interface data {
    category_id: number;
    created_at: string;
    details: string;
    duration: number;
    id: number;
    latitude: string;
    longitude: string;
    name: string;
    price: number;
    publish: number;
    rand_id: string;
    staff: string;
    status: string;
    updated_at: string;
}




@Component({
    selector: "app-estimate-response",
    templateUrl: "./estimateresponse.component.html",
    styleUrls: ["./estimateresponse.component.css"],
    animations: [


        trigger('fade',
            [
                state('void', style({ transform: 'scale(0)', height: '60px', position: 'absolute', top: '17%' })),

                transition('void => *', [
                    animate(350, style({ transform: 'scale(1)' }))
                ]),

                transition('* => void', [
                    animate(400)
                ]),
            ]
        )]
    // encapsulation: ViewEncapsulation.None,
})
export class EstimateResponseComponent implements OnInit, AfterViewInit {

    @ViewChild(AgmMap) agmMap: AgmMap;
    @ViewChild('modalContent') modalContent: TemplateRef<any>;
    fileToUpload: File = null;

    isGridView = true;
    viewName = "Grid View";
    isDisplayDetail = false;
    viewDate: Date = new Date();
    visibleSidebar2: boolean;
    visibleSidebar4: boolean;


    mainFilterHide = false;
    isListViewHide = false;
    isGridViewHide = true;

    time = { hour: 13, minute: 30 };
    meridian = true;

    serverData: any[];

    toggleMeridian() {
        this.meridian = !this.meridian;
    }

    serData: data;
    requestForms: FormGroup;






    constructor(private _script: ScriptLoaderService, private modal: NgbModal, private serverServies_services: ServerServices_Services) {

    }
    reqBeautyCategories: any[];
    ngOnInit() {
        this.reqBeautyCategories = ['Facial Care', 'Hair Removal', 'Nail Care', 'Event Planning', 'Food & Cattring', 'Pet Services'];

        this.serverServies_services.getServices()
            .subscribe(
            (data) => {
                // console.log(data.data);
                this.serData = data.data;
                console.log(this.serData);
                // console.log('this is serverData');
                // console.log(this.serverData);
                // console.log('this is interface data');
                // console.log(this.serData);
                // console.log(serData[0].price + ' ' + serData[0].publish);
            }
            );


        this.requestForms = new FormGroup({
            'reqName': new FormControl(null, Validators.required),
            'reqDetail': new FormControl(null, Validators.required),
            'reqCategory': new FormControl('Facial Care', Validators.required),
            'reqPrice': new FormControl(null, Validators.required),
            'reqDuration': new FormControl(null, Validators.required),
            'reqContactNumber': new FormControl(null, Validators.required),
            'reqIsPublish': new FormControl(true)
        });
    }


    ngAfterViewInit() {

        this._script.loadScripts('app-services',
            ['//www.amcharts.com/lib/3/plugins/tools/polarScatter/polarScatter.min.js',
                '//www.amcharts.com/lib/3/plugins/export/export.min.js',
                'assets/app/js/services.js']);




    }

    adjustRadiusMap() {
        setTimeout(() => {
            this.agmMap.triggerResize();
        }, 2000);
    }



    changeView() {

        if (this.isListViewHide) {
            this.isListViewHide = false
            this.isGridViewHide = true;
            this.viewName = "Grid View";

        } else {
            this.isGridViewHide = false;
            this.isListViewHide = true;
            this.viewName = "List View";
        }
    }

    //Calendar
    /* modalData: {
         action: string;
         event: CalendarEvent;
     };
 
     actions: CalendarEventAction[] = [
         {
             label: '<i class="fa fa-fw fa-pencil"></i>',
             onClick: ({ event }: { event: CalendarEvent }): void => {
                 // this.handleEvent('Edited', event);
             }
         },
         {
             label: '<i class="fa fa-fw fa-times"></i>',
             onClick: ({ event }: { event: CalendarEvent }): void => {
                 this.events = this.events.filter(iEvent => iEvent !== event);
                 // this.handleEvent('Deleted', event);
             }
         }
     ];
 
     refresh: Subject<any> = new Subject();
 
     events: CalendarEvent[] = [
         {
             start: subDays(startOfDay(new Date()), 1),
             end: addDays(new Date(), 1),
             title: 'A 3 day event',
             color: colors.red,
             // actions: this.actions
         },
         {
             start: startOfDay(new Date()),
             title: 'An event with no end date',
             color: colors.yellow,
             // actions: this.actions
         },
         {
             start: subDays(endOfMonth(new Date()), 3),
             end: addDays(endOfMonth(new Date()), 3),
             title: 'A long event that spans 2 months',
             color: colors.blue
         },
         {
             start: addHours(startOfDay(new Date()), 2),
             end: new Date(),
             title: 'A draggable and resizable event',
             color: colors.yellow/*,
         actions: this.actions,
         resizable: {
           beforeStart: true,
           afterEnd: true
         },
         draggable: true
         }
     ];*/

    activeDayIsOpen: boolean = true;



    /*
     dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
       if (isSameMonth(date, this.viewDate)) {
           if (
             (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
             events.length === 0
           ) {
             this.activeDayIsOpen = false;
           } else {
             this.activeDayIsOpen = true;
             this.viewDate = date;
           }
         }
       }
       handleEvent(action: string, event: CalendarEvent): void {
         this.modalData = { event, action };
         this.modal.open(this.modalContent, { size: 'lg' });
       }
 */

    //Calendar Ends


    // seding data to serve
    // submitServices(name, details, value, staff, price, duration, location, latitude, longitude, publish) {
    //     // console.log(value.value, ' ', publish.value);
    //     // console.log(this.category_id);
    //     console.log(name.value, details.value, value.value,staff.value, price.value, duration.value, location.value, longitude.value, latitude.value, publish.value);
    //     this.serverServies_services.storeServices(name.value, details.value, value.value,staff.value, price.value, duration.value, location.value, longitude.value, latitude.value, publish.value)
    //        .subscribe(
    //            (response) => {
    //                console.log(response);
    //            }
    //        )
    //     // After the data submission empty all input fields....
    //        name.value = '';
    //        details.value = '';
    //        value.value=null;
    //        staff.value = '';
    //        price.value = '';
    //        duration.value = null;
    //        location.value = '';
    //        latitude.value = '';
    //        longitude.value = '';
    //        publish = null;
    // }

    // For getting data from server call this function to get data on console....
    // getTasks() {
    //     this.serverServies_services.getTasks()
    //     .subscribe(
    //         (data) => {
    //             console.log(data);
    //         }
    //     )
    // }


    broadcastServiceRequest(recipient, serviceCategory, value, contactNumber, message) {




        // After the data submission empty all input fields....
        recipient.value = '';
        serviceCategory.value = '';
        value = '';
        contactNumber.value = '';
        message = '';
    }
    onSubmit() {
        // console.log(this.requestForms.value.reqName, this.requestForms.value.reqDetail,
        //             this.requestForms.value.reqCategory, this.requestForms.value.reqPrice,
        //             this.requestForms.value.reqDuration, this.requestForms.value.reqContactNumber,
        //             this.requestForms.value.reqIsPublish, this.fileToUpload);
        this.serverServies_services.storeRequests(this.requestForms.value.reqName,
            this.requestForms.value.reqDetail, this.requestForms.value.reqCategory,
            this.requestForms.value.reqPrice, this.requestForms.value.reqDuration,
            this.requestForms.value.reqContactNumber, this.requestForms.value.reqIsPublish,
            this.fileToUpload)
            .subscribe(
            (response) => {
                console.log(response);
            }
            )
        this.requestForms.reset();
        this.fileToUpload = null;
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }


}