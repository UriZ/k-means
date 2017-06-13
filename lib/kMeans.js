'use strict'
let Cluster = require ('./cluster.js')
let VectorOperations = require('./vectorOperations.js');

/**
 * a module implementing the k-means algorithm
 * @param dataSet the input data set, containing n dimensional observations
 * @param k number of clusters
 * @param maxIterations max allowed number of iterations
 * @returns {{kMeansClustering: kMeansClustering}} the clusters found by the algorithm
 */
function kMeans(dataSet, k, maxIterations){

    // an array of the clusters
    let clusters = [];

    /**
     * perform the k-means clustering algorithm
     * @returns {Array} an array of clusters containing the observations
     */
    function kMeansClustering(){

        // validate the input
        validate();

        // init clusters
        init();

        let i;
        for (i = 0; i < maxIterations; i++)
        {
            // cluster assignment step
            assignObservationsToClusters();

            // mean update step
            let didConverge = !updateClustersMeans();

            if (didConverge){

                // the means didn't change so we have reached a local optimum
                break;
            }
        }

        if (i == maxIterations) {
            throw new Error("algorithm did not converge, try increasing maxIterations");
        }
        else {
            // return the array of clusters
            return clusters;
        }
    }

    /**
     * initialise the k clusters using the "Forgy method" - randomly choose k observations from the input data set
     * and use them as the initial means of the k clusters
     *
     */
    function init(){
        for (let i = 0 ; i < k; i++)
        {
            // random index
            let index = randInRange(0, dataSet.length);

            // get observation from data set and use it as mean of a cluster
            let observation = dataSet[index];

            clusters.push(new Cluster(observation));
        }
    }

    function validate(){

        if (!k || !dataSet || !maxIterations){
            throw new Error("input error - missing parameters");
        }

        if (isNaN(k) || k <= 0) {
            throw new Error("input error - number of clusters should be a positive number");
        }

        if (isNaN(maxIterations) || maxIterations <= 0) {
            throw new Error("input error - maxIterations should be a positive number");
        }

        if (k > dataSet.length)
        {
            throw new Error("input error - number of clusters is larger than number of observations");
        }

        // make sure all the observations have the same dimensions, and that they are all arrays of numbers
        let dimensionsNum;

        for (let observation of dataSet)
        {
            if (!Array.isArray(observation) || observation.length == 0) {
                throw new Error("input error - observation must be a non empty array");
            }
            if (observation.some(isNaN))  {
                throw new Error("input error - observation must contain numbers only");
            }

            if (!dimensionsNum){
                // keep first length
                dimensionsNum = observation.length;
            }
            if (observation.length != dimensionsNum){
                throw new Error("input error - all observations must have the same dimensions");
            }
        }
    }

    /**
     *
     * @param min min range, integer
     * @param max max range, integer
     * @returns an integer i such that min <= i < max

     */
    function randInRange(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }


    /**
     * clear all clusters from observations
     */
    function clearClusters(){

        for (let cluster of clusters)
        {
            cluster.clearObservations();
        }
    }

    /**
     *  assignment step of the algorithm
     *  go over all observations, and assign each to the cluster with the minimal sum of squares
     *  (squared distance between observation and cluster mean)
     */
    function assignObservationsToClusters(){

        // clear all clusters before running this phase
        clearClusters();

        for (let observation of dataSet)
        {
            let minDistance = Number.MAX_VALUE;
            let minCluster;

            for (let cluster of clusters)
            {
                // calculate distance from current cluster mean
                let distance = VectorOperations.distance(observation, cluster.getMean());
                distance = Math.pow(distance,2);

                // keep min distance and cluster
                if (distance <= minDistance)
                {
                    minDistance = distance;
                    minCluster = cluster;
                }
            }

            // add the observation to the cluster with the minimal distance
            minCluster.addObservation(observation);
        }
    }


    /**
     *  the update step - recalculate the clusters means based on their new assignments, and check for convergence
     * @returns {boolean} whether or not the means have changed
     */
    function updateClustersMeans() {

        let meansChanged = false;

        for (let cluster of clusters)
        {
            let oldMean = cluster.getMean();

            // calculate new mean
            cluster.calculateMean();

            let newMean = cluster.getMean();

            if (!VectorOperations.isEqual(newMean, oldMean)) {
                meansChanged = true;
            }
        }
        return meansChanged;
    }

    // expose the public API of this module
    return {
        kMeansClustering: kMeansClustering
    }
}



module.exports = kMeans;