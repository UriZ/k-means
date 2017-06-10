'use strict'
let Cluster = require ('./cluster.js')
let VectorOperations = require('./vectorOperations.js');

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
            throw new Error("algorithm did not converge")
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

    ////////////////////////////////////!!!!!!!! todo finish validations
    function validate(){

        if (k > dataSet.length)
        {
            throw new Error("error - we should have less clusters than observations");
        }


        // make sure all the observations have the same dimensions, and that they are all numbers
        for (let observation in dataSet)
        {

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
            cluster.clearDataSet();
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
            minCluster.addDataSet(observation);
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


    return {
        init: init,
        validate: validate,
        getClusters: ()=>{
            return clusters;
        },
        kMeansClustering: kMeansClustering
    }

}



module.exports = kMeans;