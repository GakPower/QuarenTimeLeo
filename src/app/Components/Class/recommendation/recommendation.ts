import DatasetFunction from '../../../../assets/detaset';

export abstract class Recommendation {
    static currentUserRatings = [];
    static userLength = 610;
    static movieLength = 9744;


    static createMatrix() {

        const dataset = DatasetFunction;

        const lines = dataset.split('\n');


        const n = lines.length;

        const ratingMatrix = [];
        for (let i = 0; i < this.userLength; i++) {
          ratingMatrix[i] = new Array(this.movieLength);                        // we added one number to 9742 because we added the average;
        }

        for (let i = 0; i < n - 1; i++) {  // each line
            const tokens = lines[i].split(' ');

            for (let j = 0; j < 9744; j++) {  // each val curr line
                ratingMatrix[i][j] = Number(tokens[j]);
            }
        }



        return ratingMatrix;
    }

    static simple_avg(vector: number[]): number {
        let acc = 0;
        let notzero = 0;
        for (const vec of vector) {
            if (vec !== 0) {
                notzero++;
            }
            acc += vec;
        }

        return (acc / notzero);
    }


    static weighted_Avg(vector: number[], weights: number[]): number {

        if (vector.length !== weights.length) {
            alert('error in weighted average');
            return 0;
        }

        let num = 0;
        let deno = 0;

        for (let i = 0; i < vector.length; i++) {
            if (vector[i] !== 0) {                    // this to deal with the missing rates. and not add the weights.
                num += vector[i] * weights[i];
                deno += weights[i];
            }
        }

        return (num / deno);
    }

    static dot(val1: number[], val2: number[]): number {
        if (val1.length !== val2.length) {
            alert('error in dot');
            return 0;
        }

        let result = 0;
        for (let i = 0; i < val1.length; i++) {
            result += (val1[i] * val2[i]);
        }
        return result;
    }

    static vector_length(vector1: number[]): number {

        let res = 0;
        for (const vec of vector1) {
            res += (vec * vec);
        }
        return Math.sqrt(res);

    }

    static pearson_similarity(vector1: number[], vector2: number[]): number {

        if (vector1.length !== vector2.length) {
            alert('error in pearson');
            return 0;
        }


        const vector1_Avg = vector1[1];
  // we get the avgs from the arrays, we already stored the avgs in the arrays.
        const vector2_Avg = vector2[1];



        const pearson_vector1: number[] = new Array(this.movieLength - 2);
        const pearson_vector2: number[] = new Array(this.movieLength - 2);

        for (let i = 2; i < this.movieLength; i++) {
            if (vector1[i] !== 0) {
                pearson_vector1[i - 2] = vector1[i] - vector1_Avg;
    // Changing the vectors to vector-average
            } else {
                pearson_vector1[i - 2] = 0;
            }
            if (vector2[i] !== 0) {
                pearson_vector2[i - 2] = vector2[i] - vector2_Avg;
            } else {
                pearson_vector2[i - 2] = 0;
            }
        }


        const dot: number = this.dot(pearson_vector1, pearson_vector2);
        const num: number = this.vector_length(pearson_vector1) * this.vector_length(pearson_vector2);



        return (dot / num);

    }

    static scorePrediction(vector: number[], weights: number[], usersAvg: number[], currentUserAvg: number): number {
  // another weighted average method (better?)


        let num = 0;
        let deno = 0;

        for (let i = 0; i < vector.length; i++) {
            if (vector[i] !== 0) {                    // this to deal with the missing rates. and not add the weights.
                num += (vector[i] - usersAvg[i]) * weights[i];
            } else {
                num += 0;                        // its only to consider a unrated as an average rated movie.
            }
            deno += weights[i];
        }
        if (deno === 0) {
            return currentUserAvg;
        }


        return ((num / deno) + currentUserAvg);
    }





    static sort(weights: number[], userID: number[]) {
        const arr: number[] = new Array(this.userLength);

        for (let i = 0; i < this.userLength; i++) {
            arr[i] = weights[i];
        }


        for (let i = 0; i < arr.length; i++) {

            let j = i - 1;
            const key = arr[i];
            const keyID = userID[i];

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
        const neighborsID: number[] = new Array(k);
        const index: number[] = new Array(array.length);


        for (let i = 0; i < array.length; i++) {
            index[i] = i;
        }


        this.sort(array, index);

        for (let i = 0; i < k; i++) {
            neighborsID[i] = index[i];
        }

        return neighborsID;
    }



    static recommend(ratingsArray: number[]): number[] {


        this.currentUserRatings = ratingsArray;
        const ourMatrix = this.createMatrix();

        const weights: number[] = new Array(this.userLength);
        const predictedUserScores = new Array(this.movieLength - 2);

        for (let i = 0; i < this.userLength; i++) {
            weights[i] = this.pearson_similarity(ourMatrix[i], this.currentUserRatings);
        }

        const neighbors = this.nearestKNeighbors(weights, 20);


        const neighborWeights: number[] = new Array(20);
        for (let i = 0; i < neighborWeights.length; i++) {

            neighborWeights[i] = weights[neighbors[i]];

        }

        const neighboursRating = new Array(20);
        for (let i = 0; i < neighborWeights.length; i++) {
            neighboursRating[i] = ourMatrix[neighbors[i]];

        }


        const tneighbor = this.transpose(neighboursRating);

        for (let i = 2; i < this.movieLength; i++) {
            predictedUserScores[i - 2] = this.scorePrediction(tneighbor[i], neighborWeights, tneighbor[1], this.currentUserRatings[1]);

        }
        // console.log(predictedUserScores[46]);

        const bestMovies = this.nearestKNeighbors(predictedUserScores, 50);


        return bestMovies;


    }
    static transpose(array) {
        const transArray = new Array(this.movieLength);
        for (let i = 0; i < this.movieLength; i++) {
            transArray[i] = new Array(array.length);                                    // 20 is just a size k we cna change later
        }

        for (let i = 0; i < this.movieLength; i++) {
            for (let j = 0; j < array.length; j++) {
                transArray[i][j] = array[j][i];
            }
        }

        return transArray;
    }



}
