import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit , TemplateRef } from '@angular/core';
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
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

  

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

 
 
  

@Component({
    selector: "app-services",
    templateUrl: "./services.component.html",
    styleUrls: ["./services.component.css"],  
      animations: [
      
       
        trigger('fade' ,
        [
          state('void' , style({transform: 'scale(0)', height:'60px', position:'absolute', top:'17%' })),
          
          transition('void => *' , [
          animate(350 ,  style({transform: 'scale(1)'}))
        ]),

        transition('* => void' , [
            animate(400)
          ]),
      ]
    )],
    encapsulation: ViewEncapsulation.None,
})
export class ServicesComponent implements OnInit, AfterViewInit {

    @ViewChild(AgmMap) agmMap: AgmMap;
    @ViewChild('modalContent') modalContent: TemplateRef<any>;

    isGridView=true;
    viewName= "List View";
    isDisplayDetail = false;
    viewDate: Date = new Date();
    

    time = {hour: 13, minute: 30};
    meridian = true;
  
    toggleMeridian() {
        this.meridian = !this.meridian;
    }

    
   
    modalData: {
        action: string;
        event: CalendarEvent;
      };
    
      actions: CalendarEventAction[] = [
        {
          label: '<i class="fa fa-fw fa-pencil"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.handleEvent('Edited', event);
          }
        },
        {
          label: '<i class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            this.handleEvent('Deleted', event);
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
          actions: this.actions
        },
        {
          start: startOfDay(new Date()),
          title: 'An event with no end date',
          color: colors.yellow,
          actions: this.actions
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
          color: colors.yellow,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          draggable: true
        }
      ];
    
      activeDayIsOpen: boolean = true;

  
    



 
    constructor(private _script: ScriptLoaderService , private modal: NgbModal) {

    }


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


    ngOnInit() {

    }
    ngAfterViewInit() 
    {
        
            this._script.loadScripts('app-services',
            ['//www.amcharts.com/lib/3/plugins/tools/polarScatter/polarScatter.min.js',
            '//www.amcharts.com/lib/3/plugins/export/export.min.js',
            'assets/app/js/services.js']);

          
        

    }
    
    adjustRadiusMap()
    {
        setTimeout(() => {
            this.agmMap.triggerResize();
        }, 2000);
    }

   
    
    changeView()
    {
        this.isGridView=!this.isGridView;
        if(this.isGridView)
        {
            this.viewName= "List View";
        }
        else
        {
            this.viewName= "Grid View";
        }
    }

}