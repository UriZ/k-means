# k-means
This repository contains an implementation of the k-means algorithm:
- stand alone implementation 
- an Azure Function running the algorithm 

# Algorithm 
"Given a set of observations (x1, x2, …, xn), where each observation is a d-dimensional real vector, k-means clustering aims to partition the n observations into k (≤ n) sets S = {S1, S2, …, Sk} so as to minimize the within-cluster sum of squares (squared Euclidean distance)".
Essentially, we aim to group each observation in the "closest" cluster - to minimise the distance between the observation and the cluster's mean.

Algorithm steps:
- one time initialisation: create a seed of k clusters. There are various methods for this, the one implemented here is the Forgy method - randomly select k observations from the data set to serve as the means of the k initial clusters:
- repeat until convergence 
  - go over all the observations, and assign each one to the closest cluster (with the minimal distance between the observation and the mean)
  - recalculate the means of the clusters
- convergence is reached when the means dont change (or when a maximal number of iterations has passed)

# Usage 
## Azure function
- The function can be trigered by a console application, available here: https://github.com/UriZ/kmconsole and running here: http://173.193.107.30:31798/
- To test the Azure function directly, you can use the attached Postman collection
## Stand alone implementation
- Use the following pattern
  // requrie the module, e.g.
  const kMeans = require('../lib/kMeans.js');
  
  // init module with input data : data set, number of clusters, max iterations 
  let km = kMeans([[1,1,1],[2,2,2],[100,100,100],[99,99,99],[0,0,0]],2,100);
  
  // run the algorithm
  let clusters = km.kMeansClustering();

  // use cluster data, e.g. print to console
  for (let cluster of clusters)
            {
                console.log("mean: " + cluster.getMean());
                console.log("size: " + cluster.getObservations().length);
                console.log("observations: " + JSON.stringify(cluster.getObservations()));
            }

# Testing
run npm test to run unit tests on the module 


