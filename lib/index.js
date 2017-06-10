/**
 * this file is intended to be used as an azure function to run the kmeans algorithm
 * @type {kMeans}
 */
let kMeans = require ('./kMeans.js');

module.exports = function (context, req) {

    if (req.body && req.body.kMeansInput){

        let k = req.body.kMeansInput.k;
        let maxIterations = req.body.kMeansInput.maxIterations;
        let dataSet = req.body.kMeansInput.dataSet;

        let km = kMeans(dataSet,k,maxIterations);
        try{
            // run the clustering
            let clusters = km.kMeansClustering();

            let responseArray = [];

            for (let cluster of clusters)
            {
                let clusterData = {};
                clusterData.mean = cluster.getMean();

                let observations = cluster.getDataSets();
                clusterData.size = observations.length;
                clusterData.observations = observations;

                // add cluster data to array
                responseArray.push(clusterData);
            }

            let kMeansResult = {"k-means clusters":responseArray};

            context.res = {
                status:200,
                body: JSON.parse(JSON.stringify(kMeansResult))
            }
        }
        catch(err) {
            context.res = {
                status: 400,
                body: err.message
            }
        }
    }
    else {
        context.res = {
            status: 400,
            body: "input parameters missing from request"
        };
    }
    context.done();
};