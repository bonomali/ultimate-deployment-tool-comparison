import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as saveAs from 'file-saver';

import { Data, CriteriaSelection, Criteria, TableData } from '../shared/index';





import { ComparisonCitationService } from './comparison-citation.service';





    changeDetection: ChangeDetectionStrategy.OnPush,





    private order: Array<String> = new Array<String>(3);
    private orderOption: Array<number> = new Array<number>(3);
    private ctrlCounter:number = 0;
     



            public confServ: ComparisonConfigService,
            public citationServ: ComparisonCitationService,
            private cd: ChangeDetectorRef

        this.confServ.loadComparison(this.cd);
        this.confServ.loadCriteria(this.cd);
        this.confServ.loadTableData(this.cd);
        this.confServ.loadDescription(this.cd);
        this.citationServ.loadCitationData(this.cd);
        
        this.order[0] = this.order[1] = this.order[2] = "tag";
        this.orderOption[0] = 1;
        this.orderOption[1] = this.orderOption[2] = 0;
    } 
    




        this.cd.markForCheck();


    private orderChanged(value:String, pos:number){
        if(this.order.length > pos){
            this.order[pos] = value;
        }
        this.cd.markForCheck();
    }
    private orderOptionChanged(value:number, pos:number){
        if(this.orderOption.length > pos){
            this.orderOption[pos] = value;
        }
        this.cd.markForCheck();
    }
    
    private orderClick(e:MouseEvent, value:string){
        let pos:number = this.order.findIndex(name => name == value);
        if(e.ctrlKey){
            this.ctrlCounter = this.order[this.ctrlCounter] == value ? this.ctrlCounter: this.ctrlCounter + 1;
        } else {
            this.ctrlCounter = 0;
        }
        if(typeof pos != 'undefined' && pos >= 0){
            this.order[this.ctrlCounter] = value;
            this.orderOption[this.ctrlCounter] = this.orderOption[pos] == 1? -1: 1;
            this.orderOption[pos] = pos != this.ctrlCounter? 0 : this.orderOption[this.ctrlCounter];
        } else {
            this.order[this.ctrlCounter] = value;
            this.orderOption[this.ctrlCounter] = 1;
        }
        if (this.ctrlCounter == 0){
            for (let i = 1; i < this.orderOption.length; i++) {
                this.orderOption[i] = 0;
            } 
        }
        this.cd.markForCheck();
    }
    
    private displayOrder(value:string, option:number): boolean{
        return this.order.findIndex(val => val == value) >= 0 && this.orderOption[this.order.findIndex(val => val == value)] == option;
    }
    











    
    @ViewChild('latextable') latexTable: ElementRef;
    private downloadLatexTable(){
        let content:string = this.latexTable.nativeElement.textContent;
        content = content.substr(content.indexOf('%'), content.length);
        let blob: Blob = new Blob([content], {type: 'plain/text'});
        let s = saveAs;
        saveAs(blob, "latextable.tex"); 
        return window.URL.createObjectURL(blob);
    }
    
    private showTable: boolean = false;
    private previewLatexTable(show){
        if (show){
            this.latexTable.nativeElement.classList.remove("ltable");    
        } else {
            this.latexTable.nativeElement.classList.add("ltable");
        }
    }

