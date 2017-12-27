import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

	constructor(public http:Http) {}

	fetchWordList(numberOfRecords:number){
		return this.http.post('https://sagarsrivastava.in/ttt',{recordsToFetch:numberOfRecords}).map(res => res.json());
	}
}
