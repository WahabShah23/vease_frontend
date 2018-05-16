import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { Helpers } from '../../../../helpers';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { AgmMap } from '@agm/core';

@Component({
    selector: "app-services",
    templateUrl: "./services.component.html",
    styleUrls: ["./services.component.css"],
    encapsulation: ViewEncapsulation.None,
})
export class ServicesComponent implements OnInit, AfterViewInit {

    @ViewChild(AgmMap) agmMap: AgmMap;
    isGridView=true;
    viewName= "List View";
    constructor(private _script: ScriptLoaderService) {

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
    
    doit()
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