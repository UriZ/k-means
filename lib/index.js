
let kMeans = require ('./kMeans.js');

/**
 * Azure function running the k-means algorithm
 * @param context
 * @param req
 */
module.exports = function (context, req) {

    if (req.body && req.body.kMeansInput){

        let k = req.body.kMeansInput.k;
        let maxIterations = req.body.kMeansInput.maxIterations;
        let dataSet = req.body.kMeansInput.dataSet;

        // init k means module
        let km = kMeans(dataSet,k,maxIterations);

        try{
            // run the clustering
            let clusters = km.kMeansClustering();

            let responseArray = [];

            for (let cluster of clusters)
            {
                // collect data on each cluster
                let clusterData = {};
                clusterData.mean = cluster.getMean();

                let observations = cluster.getObservations();
                clusterData.size = observations.length;
                clusterData.observations = observations;

                // add cluster data to array
                responseArray.push(clusterData);
            }

            let kMeansResult = {"k-means clusters":responseArray};

            context.res = {
                status:200,
                body: kMeansResult
            }
        }
        catch(err) {
            context.res = {
                status: 400,
                body: {error: err.message}
            }
        }
    }
    else {
        context.res = {
            status: 400,
            body: {error: "error - input parameters missing from request"}
        };
    }
    context.done();
};