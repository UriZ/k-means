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
## Stand alone module
- Use the following pattern

```javascript
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
```

# API
## Azure function 
- The function expects a POST request with the following JSON structure as the body:
```json
{
  "kMeansInput":
    {
      dataSet: [[1,1,1],[2,2,2],[1,1,1],[4,5,5],[9,9,9],[4,4,4]],
      k:3,
      maxIterations:10
    }
}
```
- The function returns the following JSON structure:
```json
  {
    "k-means clusters":
      [
        {"mean":[2,2,2],"size":1,"observations":[[2,2,2]]},
        {"mean":[5.666666666666667,6,6],"size":3,"observations":[[4,5,5],[9,9,9],[4,4,4]]},   
        {"mean":[1,1,1],"size":2,"observations":[[1,1,1],[1,1,1]]}
      ]
  }
```



## Stand alone module 
- 
# Testing
run npm test to run the unit tests covering the module 

