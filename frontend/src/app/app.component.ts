import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';
  dataForm:{numberOfRecords:string,err:string} = {numberOfRecords:"",err:""};
  wordList:object[];
  wordCount:{total:any, fetched:any};
  showPreloader:boolean = false;
  
  constructor(private dataServices:DataService){
    this.wordList = [];
    this.wordCount = {total: "--", fetched: "--"}
  }

  ngOnInit(){
    this.wordList = [];
  }

  fetchData(){
    this.dataForm.err = "";
    var regex = /^\d+$/g;
    if(regex.test(this.dataForm.numberOfRecords.trim()) && parseInt(this.dataForm.numberOfRecords.trim())>0){
        this.dataForm.err = "";
        this.showPreloader = true;
        this.dataServices.fetchWordList(parseInt(this.dataForm.numberOfRecords.trim())).subscribe((resp)=>{
          this.wordList = [];
          if(resp.error.code==200){
            this.wordList = resp.data.list;
            this.wordCount.total = resp.data.count.total;
            this.wordCount.fetched = resp.data.count.fetched;
          }else{
            this.dataForm.err = resp.error.message;
          }
          this.showPreloader = false;
        },(err)=>{
          err = JSON.parse(err._body);
          this.dataForm.err = err.error.message;
          this.wordCount.total = this.wordCount.fetched = "--";
          this.wordList = [];
          this.showPreloader = false;
        });
    }else{
      this.showPreloader = false;
      this.dataForm.err = "Please enter a valid number greater than zero.";
    }
  }
}