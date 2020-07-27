import { Component, OnInit,AfterViewInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Subject, Observable, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, mergeAll } from 'rxjs/operators';
import { DataShareService } from 'src/app/data-share.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService:DashboardService,private dataShare:DataShareService) { }
  products=[];
  loading:boolean=true;
  productArrayCopy=[];
  filterObj={
    colourArray:[],
    discount:[]
  }
  colorFilter:boolean=false;
  discountFilter:boolean=false;
  total:number=0;
  minValue;
  maxValue;
  ngOnInit(): void {
    this.dashboardService.getCards()
    .subscribe((res:any)=>{
      let colorArray=[];
      let discountArray=[];
      this.products=res;
      this.productArrayCopy=[...this.products];
      res.forEach(val=>{
        colorArray.push(val.colour.title);
        discountArray.push(val.discount)
      });
      colorArray=[...new Set(colorArray)];
      discountArray=[...new Set(discountArray)];
      discountArray.sort();
      colorArray.map((color)=>{
        this.filterObj.colourArray.push({
          label:color,
          value:false
        })
      })
      discountArray.map((dis)=>{
        this.filterObj.discount.push({
          label:dis,
          value:false
        })
      })
      console.log(colorArray);
      this.loading=false;
    })
  }

  applyFilters(){
    if(this.filterObj.colourArray.find((prod)=> prod.value==true)){
      this.colorFilter=true;
    }
    else{
      this.colorFilter=false;
      console.log("passed fale");
    }
    if(this.filterObj.discount.find((prod)=> prod.value==true)){
      this.discountFilter=true;
    }
    else{
      this.discountFilter=false;
      console.log("passed fale");
    }
    //   this.products.filter((product)=>{
    //     let bool=false;
    //     this.filterObj.colourArray.map((color)=>{
    //       if(color.value){
    //         if(product.colour.title==color.label){
    //           bool=true;
    //           break;
    //         }
    //         else{
    // bool=false;
    //         }
    //       }
    //     })
    //   });
      // console.log(this.products)
      if(this.colorFilter){
        this.products= this.productArrayCopy.filter((product)=>{
          let bool=false;
           for(let i=0;i<this.filterObj.colourArray.length;i++){
            if(this.filterObj.colourArray[i].value){
              if(product.colour.title==this.filterObj.colourArray[i].label){
                bool=true;
                break;
              }
              else{
                bool=false;
              }
            }
          }
          return bool;
        })
      }
      else{
        this.products=[...this.productArrayCopy];
      }
    
      if(this.discountFilter){
        const productDisArr=[...this.products];
        this.products= productDisArr.filter((product)=>{
          let bool=false;
           for(let i=0;i<this.filterObj.discount.length;i++){
            if(this.filterObj.discount[i].value){
              if(product.discount==this.filterObj.discount[i].label){
                bool=true;
                break;
              }
              else{
                bool=false;
              }
            }
          }
          return bool;
        })
      }
     if(this.minValue!="" && this.minValue!=undefined){
       const productArr=[...this.products];
       this.products=productArr.filter((product)=> product.price.final_price > this.minValue)
     }
    if(this.maxValue!="" && this.maxValue!=undefined){
      const productArr=[...this.products];
      this.products=productArr.filter((product)=> product.price.final_price < this.maxValue)
    }
    }
    ngAfterViewInit(){
      const searchBox = document.getElementById('search');
    // streams
    const keyup$ = fromEvent(searchBox, 'keyup');
    // keyup$.subscribe(val=>console.log(val))
    keyup$
      .pipe(
        map((val: any) => val.currentTarget.value),
        debounceTime(500),
        distinctUntilChanged(),
        map((searchText)=>this.dashboardService.search(searchText)),
        mergeAll()
      )
      .subscribe((res:any)=>{
    this.products=res;
      });
    }
    addTotal(){
      this.total++;
      this.dataShare.total.next(this.total);
    }
    resetFilter(){
      this.filterObj.colourArray.map((color)=>{
        color.value=false;
      })
      this.filterObj.discount.map((discount)=>{
        discount.value=false;
      })
      this.products=[...this.productArrayCopy]
    }
}
