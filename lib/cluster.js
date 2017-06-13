'use strict';

/**
 * a cluster of n dimensional arrays (observations)
 * @type {Cluster}
 */
module.exports = class Cluster{

    /**
     *
     * @param mean
     */
    constructor(clusterMean)
    {
        // the mean of the cluster
        let mean = clusterMean;

        this.getMean = ()=>{
            return mean;
        }

        this.setMean = (clusterMean)=>{
            mean = clusterMean;
        }

        // array of observations
        let observations = [];

        this.getObservations = ()=>{
            return observations;
        }

        this.setObservations = (clusterObservations)=>{
            observations = clusterObservations;
        }

    }

    /**
     * add an observation to the cluster
     * @param observation n dimensional array
     */
    addObservation(observation){
        this.getObservations().push(observation);
    }


    /**
     * clear cluster observations
     */
    clearObservations()
    {
        this.setObservations([]);
    }

    /**
     * calculate cluster mean
     */
    calculateMean(){

        let observations = this.getObservations();

        if (!observations || observations.length == 0)
        {
            // empty cluster - do nothing
            return;
        }

        let mean = [];

        // loop over all the observations in the cluster
        for (let observation of observations)
        {
            // loop over observation dimensions
            for (let i = 0; i < observation.length; i++)
            {
                // sum all dimensions in mean array
                mean[i] = mean[i] ? mean[i] + observation[i] : observation[i];
            }
        }
        // divide mean's dimensions by number of observations to get the mean
        for (let i = 0; i < mean.length; i++)
        {
            mean[i] = mean[i] / observations.length;
        }

        // set new mean
        this.setMean(mean);
    }
}
