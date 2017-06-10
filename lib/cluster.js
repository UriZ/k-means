'use strict';

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

        // array of data sets
        let dataSets = [];

        this.getDataSets = ()=>{
            return dataSets;
        }

        this.setDataSet = (set)=>{
            dataSets = set;
        }

    }

    /**
     * add a data set to the cluster
     * @param dataSet n dimensional vector
     */
    addDataSet(dataSet){
        this.getDataSets().push(dataSet);
    }


    /**
     * clear the data set of the cluster
     */
    clearDataSet()
    {
        this.setDataSet([]);
    }

    /**
     * calculate cluster mean
     */
    calculateMean(){

        let dataSets = this.getDataSets();

        if (!dataSets || dataSets.length == 0)
        {
            // empty cluster - do nothing
            return;
        }

        let mean = [];

        // loop over the data sets in the cluster
        for (let set of dataSets)
        {
            // loop over data set dimensions
            for (let i = 0; i < set.length; i++)
            {
                // sum all dimensions in mean array
                mean[i] = mean[i] ? mean[i] + set[i] : set[i];
            }
        }
        // divide mean's dimensions by number of dataSets to get the mean
        for (let i = 0; i < mean.length; i++)
        {
            mean[i] = mean[i] / dataSets.length;
        }

        // set new mean
        this.setMean(mean);
    }
}
