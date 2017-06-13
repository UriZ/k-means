'use strict'
/**
 * Utility class for operations on vectors of n dimensions
 * @type {VectorOperations}
 */
module.exports = class VectorOperations{

    /**
     * calculate the Euclidean distance between two vectors of n dimensions
     * @param fromVector
     * @param toVector
     */
    static distance(fromVector, toVector) {

        if (!fromVector || !toVector){
            throw new Error("missing input parameters")
        }

        if (fromVector.some(isNaN) || toVector.some(isNaN)){
            throw new Error("vectors must contain numbers only");
        }

        if (fromVector.length != toVector.length) {
            throw new Error("vectors must be of the same dimensions");
        }

        let distance = 0;

        for (let i = 0; i < fromVector.length; i++)
        {
            // sum the square of the differences in all dimensions
            distance += Math.pow(fromVector[i] - toVector[i],2);
        }

        distance = Math.sqrt(distance);

        return distance;
    }

    /**
     * compare two vectors of n dimensions
     * @param v1
     * @param v2
     * @returns {boolean} whether the vectors are identical
     */
    static isEqual(v1, v2) {

        if (!v1 || !v2){
            throw new Error("missing input parameters")
        }
        // make sure both vectors contain only numbers
        if (v1.some(isNaN) || v2.some(isNaN)){
            throw new Error("vectors must contain numbers only");
        }

        // check for length
        if (v1.length != v2.length) {
            return false;
        }

        for (let i = 0; i < v1.length; i++)
        {
            if (v1[i] != v2[i]){

                return false;
            }
        }

        // vectors are identical
        return true;
    }
};