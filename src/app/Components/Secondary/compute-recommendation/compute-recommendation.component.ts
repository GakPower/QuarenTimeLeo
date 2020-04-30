import { Component, OnInit } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
//import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase/app';
import { environment } from '../../../../environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import DatasetFunction from '../../../../assets/Dataset';

@Component({
  selector: 'app-compute-recommendation',
  templateUrl: './compute-recommendation.component.html',
  styleUrls: ['./compute-recommendation.component.scss']
})
export class ComputeRecommendationComponent implements OnInit {

  constructor(private database:AngularFireStorage) {  
  }

  ngOnInit(): void {
  }

  simple_avg(vector: number[]): number{
    var acc = 0;
    var notzero = 0;
    for(var i = 0; i< vector.length; i++){
      if(vector[i] != 0){
        notzero++;
      }
      acc += vector[i];
    }
    
    return (acc/notzero);
  }


  weighted_Avg(vector:number[], weights:number[]): number{
   
    if(vector.length!=weights.length) {
      alert("error in weighted average")
      return 0;
    }
    
    var num = 0;
    var deno = 0;

    for(var i =0; i <vector.length;i++) {
      if(vector[i] != 0) {                    //this to deal with the missing rates. and not add the weights.
        num += vector[i]*weights[i];                
        deno += weights[i];
      }
    }

    return (num/deno);
  }

  dot(val1:number[],val2:number[]):number {
    if(val1.length!=val2.length){
      alert("error in dot");
      return 0;
    }

    var result = 0;
    for(var i = 0; i < val1.length; i++){
      result += (val1[i]*val2[i]);
    }
    return result;
  }

  vector_length(vector1:number[]):number{
    
    var res = 0;
    for(var i = 0; i < vector1.length; i++){
      res += (vector1[i]*vector1[i]);
    }
    return Math.sqrt(res);

  }

  pearson_similarity(vector1:number[], vector2:number[]): number{
    
    if(vector1.length!=vector2.length) {
      alert("error in pearson")
      return 0;
    }

    var vector1_Avg:number = this.simple_avg(vector1);
    var vector2_Avg:number = this.simple_avg(vector2);

    var pearson_vector1: number[] = new Array(vector1.length);
    var pearson_vector2: number[] = new Array(vector2.length);
    
    for(var i = 0; i< vector1.length;i++){
      if(vector1[i] != 0 ){
        pearson_vector1[i] = vector1[i] - vector1_Avg;         //Changing the vectors to vector-average 
      } else { 
        pearson_vector1[i] = 0;
      }
      if(vector2[i] != 0 ){
        pearson_vector2[i] = vector2[i] - vector2_Avg;
      } else { 
        pearson_vector2[i] = 0;
      }
    }
   
    var dot:number = this.dot(pearson_vector1,pearson_vector2);
    var num:number = this.vector_length(pearson_vector1)*this.vector_length(pearson_vector2);

    
    return (dot/num);

  }

  scorePrediction(vector:number[], weights:number[],usersAvg:number[],currentUserAvg:number): number{                        //another weighted average method (better?)
  
    if(vector.length!=weights.length) {
      alert("error in scoreprediction")
      return 0;
    }
    
    var num = 0;
    var deno = 0;
    
    for(var i =0; i < vector.length;i++) {
      if(vector[i] != 0) {                    //this to deal with the missing rates. and not add the weights.
        num += (vector[i]-usersAvg[i])*weights[i];                
      } else { 
        num += 0;                        //its only to consider a unrated as an average rated movie.
      }
      deno += weights[i]; 
    }
    return (num/deno) + currentUserAvg;
  }
  

  recommend():void{
    
    var storageRef = this.database.ref('FinalMovieDataset.txt');
    

// Get the download URL 
storageRef.getDownloadURL().subscribe(function(url) {
  console.log(url);

  //fetch(url).then(response =>  { 
   // console.log(response);
  //})
  
  /*var xhr = new XMLHttpRequest();
  xhr.responseType = "";
  xhr.onload = function(event) {
    var movieDataset = xhr.response;
    console.log("success");
  };
  
  xhr.open('GET', url);
  xhr.send();
*/
  
 
})
 
    
    



  }



 /* recommended():void{
    var vector1:number[] = [4, 0, 0, 5, 1, 0];         //3.3
    var vector2:number[] = [5, 5, 4, 0, 0, 0];         //14/3
    var vector3:number[] = [0, 0, 0, 2, 4, 5];          
    
    var weight1 = this.pearson_similarity(vector1,vector2);
    var weight2 = this.pearson_similarity(vector1,vector3);
    
    for(var i = 0; i < vector1.length; i++) {
      var arr = [vector2[i], vector3[i]];
      var arrWeights = [weight1,weight2];
      var userAvg = this.simple_avg(vector1);
      var usersAvg:number[] = [this.simple_avg(vector2),this.simple_avg(vector3)]
      
      var score = this.scorePrediction(arr,arrWeights, usersAvg ,userAvg);                    //Dont count movies with really few k neighbors
      console.log("the predicted score for movie number:" + i + "is" + score);
    }
    
    
    //we store the 10 recommended movies 
  }*/
}
