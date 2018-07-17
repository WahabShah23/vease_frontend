import { Component, ViewChild } from '@angular/core';
import { ScriptLoaderService } from '../../../../_services/script-loader.service';
import { AgGridNg2 } from 'ag-grid-angular';
declare var $: any;

@Component({
    selector: 'resolution-centre',
    templateUrl: './resolutionCentre.component.html',
    styleUrls: ['./resolutionCentre.component.css']

})
export class ResolutionCentreComponent {

    @ViewChild('agGrid') agGrid: AgGridNg2;

    complaints = true;
    cardClassActive = false;

    firstRowActive = false;
    secondRowActive = false;
    disputeRightSideActive = false;
    mainFilterHide = false;
    enableColResize: boolean;
    enableSorting: boolean;
    enableFilter: boolean;
    gridApi;
    rowSelection = "single";
    gridColumnApi;

    columnDefs = [
        { headerName: '#', field: 'id' },
        { headerName: 'Company', field: 'company' },
        { headerName: 'Service', field: 'service' },
        { headerName: 'Status', field: 'status' }
    ];

    rowData = [
        { id: '1', company: 'Handy Autos', service: ' Oil & Oil Filter Changing', status: 'Resolved' },
        { id: '2', company: 'Mont Hair', service: 'Fancy Cutting', status: ' In-Progress' }
    ];

    constructor(private _script: ScriptLoaderService) {

    }


    ngAfterViewInit() {
      

        this._script.loadScripts('resolution-centre',
            ['assets/app/js/services.js']);

    }


    test() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map(node => node.data);
        this.disputeRightSideActive = true;
        if (selectedData[0].id == 1) {
            this.secondRowActive = false;
            this.firstRowActive = true;
        } else {
            this.firstRowActive = false;
            this.secondRowActive = true;
        }
    }

}
