import { Injectable } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {DictionaryWordRecord} from '../dictionary-word-record';
import { throwError as obserableThrowError, Observable, Subject } from "rxjs";
import {catchError} from 'rxjs/operators';

interface DictionaryWordSingleRecord{
  id:number;
  term:string;
  meaning:string;
  example:string;
  category:string;
  status:string;
}

@Injectable({
  providedIn: 'root'
})
export class DictionaryWordsService {

  private _url_word: string="http://www.worldemoneyexperts.com/dictionary/russian_sinhala_dictionary_api.php";
  result:Observable<DictionaryWordSingleRecord>;
  constructor(private http: HttpClient) { }



getDictionaryWord(searchingWord:string):Observable<DictionaryWordSingleRecord>{

  let request_url=this._url_word+"?word="+searchingWord;

  this.result= this.http.get<DictionaryWordSingleRecord>(request_url).pipe(
          
          catchError(this.errorHandler)
  );
   return this.result;
 
}

getDictionarySuggested(searchingWord:string):Observable<DictionaryWordSingleRecord>{

  let request_url=this._url_word+"?suggest="+searchingWord;

  this.result= this.http.get<DictionaryWordSingleRecord>(request_url).pipe(
          
          catchError(this.errorHandler)
  );
   return this.result;
 
}
  
  getDictionaryWords():Observable<DictionaryWordRecord[]>{
    return this.http.get<DictionaryWordRecord[]>(this._url_word).pipe(
                  catchError(this.errorHandler)
    );   

  }

  errorHandler(error: HttpErrorResponse){
    return obserableThrowError(error.message || "Server Error");
  }

}
