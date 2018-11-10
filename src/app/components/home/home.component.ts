import { Component, OnInit } from '@angular/core';
import {DictionaryWordsService} from '../../services/dictionary-words.service';

import {MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule, MatProgressSpinnerModule} from '@angular/material';
import { DictionaryWordRecord } from '../../dictionary-word-record';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public dictionaryWords = [];
  public errorMsg;
  public SearchingdictionaryWord;
  public resultDictinaryWordRecord:Object;
  public isWordNotFound:boolean=false;
  public suggestedWordArray:any;
  public loadingSpinnerActive=false;

  public resultDictionWordRecordId:string;
  public resultDictionWordRecordTerm:string;
  public resultDictionWordRecordMeaning:any; 
  public resultDictionWordRecordExample:string; 
  public resultDictionWordRecordCategory:string; 
  public resultDictionWordRecordStatus:string;
  public resultDictionWordRecordIdLength:string; 
  public categories=["Male","Female","Neutral","Not a Noun"];
    
  constructor(private _dictionaryWordService : DictionaryWordsService) { }

  onKeyUp(event:any){
    this.loadingSpinnerActive=true;
      this.SearchingdictionaryWord=event.target.value;
      if(event.keyCode == 13) {
        this.retriveMeaning();
      }
    }

    onClick(word:any){
          
      this.loadingSpinnerActive=true;
       this.SearchingdictionaryWord=word;
       this.retriveMeaning();

     
    }

  arrayOfMeaning(meaningList:any){
    let meaningArray;
    meaningList=meaningList.trim();
    meaningArray=meaningList.split("\n");
    return meaningArray;

  }

  retriveMeaning(){
    

    
    let searchingWord=this.SearchingdictionaryWord;
    searchingWord=searchingWord;

    try{
    searchingWord=searchingWord.trim();
    }
    catch(e){}  
    
    
    this._dictionaryWordService.getDictionaryWord(searchingWord)
    .subscribe(
      (data)=>{
        
        try{

            this.resultDictionWordRecordIdLength=data[0].id.length;
            this.isWordNotFound =false;
            this.resultDictinaryWordRecord=data[0];
            this.resultDictionWordRecordId=data[0].id;
            this.resultDictionWordRecordTerm=data[0].term;
            this.resultDictionWordRecordMeaning=this.arrayOfMeaning(data[0].meaning);
            this.resultDictionWordRecordExample=data[0].example;
            this.resultDictionWordRecordCategory=this.categories[data[0].category-1];
            this.resultDictionWordRecordStatus=data[0].status;

        }
        catch(e){
          this.retriveSuggestedList();
          this.isWordNotFound=true;
          return;
        }

      }
    );

    this.loadingSpinnerActive=false;


  }

  retriveSuggestedList(){
    this._dictionaryWordService.getDictionarySuggested(this.SearchingdictionaryWord)
    .subscribe(
      (data)=>{
        
        this.suggestedWordArray=data;
           

      }
    );
  }
  

 

  ngOnInit() {
      this._dictionaryWordService.getDictionaryWords()
          .subscribe(data => this.dictionaryWords = data,
                    error=> this.errorMsg=error);

  }



}
