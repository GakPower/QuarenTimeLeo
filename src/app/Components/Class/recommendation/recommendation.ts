import DatasetFunction from '../../../../assets/detaset';

export abstract class recommendation {
    static currentUserRatings = [];
    static userLength: number = 610;
    static movieLength: number = 9744;


    static createMatrix() {

        var dataset = DatasetFunction;

        let lines = dataset.split("\n");


        let n = lines.length;

        var ratingMatrix = [];
        for (var i = 0; i < this.userLength; i++) {
            ratingMatrix[i] = new Array(this.movieLength);                        //we added one number to 9742 because we added the average;
        }

        for (let i = 0; i < n - 1; i++) {  // each line
            let tokens = lines[i].split(" ");


            for (let j = 0; j < 9744; j++) {  // each val curr line
                ratingMatrix[i][j] = Number(tokens[j]);
            }
        }



        return ratingMatrix;
    }

    static simple_avg(vector: number[]): number {
        var acc = 0;
        var notzero = 0;
        for (var i = 0; i < vector.length; i++) {
            if (vector[i] != 0) {
                notzero++;
            }
            acc += vector[i];
        }

        return (acc / notzero);
    }


    static weighted_Avg(vector: number[], weights: number[]): number {

        if (vector.length != weights.length) {
            alert("error in weighted average")
            return 0;
        }

        var num = 0;
        var deno = 0;

        for (var i = 0; i < vector.length; i++) {
            if (vector[i] != 0) {                    //this to deal with the missing rates. and not add the weights.
                num += vector[i] * weights[i];
                deno += weights[i];
            }
        }

        return (num / deno);
    }

    static dot(val1: number[], val2: number[]): number {
        if (val1.length != val2.length) {
            alert("error in dot");
            return 0;
        }

        var result = 0;
        for (var i = 0; i < val1.length; i++) {
            result += (val1[i] * val2[i]);
        }
        return result;
    }

    static vector_length(vector1: number[]): number {

        var res = 0;
        for (var i = 0; i < vector1.length; i++) {
            res += (vector1[i] * vector1[i]);
        }
        return Math.sqrt(res);

    }

    static pearson_similarity(vector1: number[], vector2: number[]): number {

        if (vector1.length != vector2.length) {
            alert("error in pearson")
            return 0;
        }


        var vector1_Avg = vector1[1];                            //we get the avgs from the arrays, we already stored the avgs in the arrays.
        var vector2_Avg = vector2[1];



        var pearson_vector1: number[] = new Array(this.movieLength - 2);
        var pearson_vector2: number[] = new Array(this.movieLength - 2);

        for (var i = 2; i < this.movieLength; i++) {
            if (vector1[i] != 0) {
                pearson_vector1[i - 2] = vector1[i] - vector1_Avg;         //Changing the vectors to vector-average 
            } else {
                pearson_vector1[i - 2] = 0;
            }
            if (vector2[i] != 0) {
                pearson_vector2[i - 2] = vector2[i] - vector2_Avg;
            } else {
                pearson_vector2[i - 2] = 0;
            }
        }


        var dot: number = this.dot(pearson_vector1, pearson_vector2);
        var num: number = this.vector_length(pearson_vector1) * this.vector_length(pearson_vector2);



        return (dot / num);

    }

    static scorePrediction(vector: number[], weights: number[], usersAvg: number[], currentUserAvg: number): number {                        //another weighted average method (better?)


        var num = 0;
        var deno = 0;

        for (var i = 0; i < vector.length; i++) {
            if (vector[i] != 0) {                    //this to deal with the missing rates. and not add the weights.
                num += (vector[i] - usersAvg[i]) * weights[i];
            } else {
                num += 0;                        //its only to consider a unrated as an average rated movie.
            }
            deno += weights[i];
        }
        if (deno == 0) {
            return currentUserAvg;
        }


        return ((num / deno) + currentUserAvg);
    }





    static sort(weights: number[], userID: number[]) {
        var arr: number[] = new Array(this.userLength);

        for (var i = 0; i < this.userLength; i++) {
            arr[i] = weights[i];
        }


        for (let i: number = 0; i < arr.length; i++) {

            let j = i - 1;
            let key = arr[i];
            let keyID = userID[i];

            while (j > -1 && arr[j] < key) {
                arr[j + 1] = arr[j];
                userID[j + 1] = userID[j];
                j--;
            }

            arr[j + 1] = key;
            userID[j + 1] = keyID;

        }





    }

    static nearestKNeighbors(array: number[], k): number[] {
        var neighborsID: number[] = new Array(k);
        var index: number[] = new Array(array.length);


        for (var i = 0; i < array.length; i++) {
            index[i] = i;
        }


        this.sort(array, index);

        for (var i = 0; i < k; i++) {
            neighborsID[i] = index[i];
        }

        return neighborsID;
    }



    static recommend(ratingsArray: number[]): number[] {


        this.currentUserRatings = ratingsArray;
        var ourMatrix = this.createMatrix();

        var weights: number[] = new Array(this.userLength);
        var predictedUserScores = new Array(this.movieLength - 2);

        for (var i = 0; i < this.userLength; i++) {
            weights[i] = this.pearson_similarity(ourMatrix[i], this.currentUserRatings);
        }

        var neighbors = this.nearestKNeighbors(weights, 20);


        var neighborWeights: number[] = new Array(20);
        for (var i = 0; i < neighborWeights.length; i++) {

            neighborWeights[i] = weights[neighbors[i]];

        }

        var neighboursRating = new Array(20);
        for (var i = 0; i < neighborWeights.length; i++) {
            neighboursRating[i] = ourMatrix[neighbors[i]];

        }


        var tneighbor = this.transpose(neighboursRating);

        for (var i = 2; i < this.movieLength; i++) {
            predictedUserScores[i - 2] = this.scorePrediction(tneighbor[i], neighborWeights, tneighbor[1], this.currentUserRatings[1]);

        }
        //console.log(predictedUserScores[46]);

        var bestMovies = this.nearestKNeighbors(predictedUserScores, 50);


        return bestMovies;


    }
    static transpose(array) {
        var transArray = new Array(this.movieLength);
        for (var i = 0; i < this.movieLength; i++) {
            transArray[i] = new Array(array.length);                                    // 20 is just a size k we cna change later
        }

        for (var i = 0; i < this.movieLength; i++) {
            for (var j = 0; j < array.length; j++) {
                transArray[i][j] = array[j][i];
            }
        }

        return transArray;
    }



}