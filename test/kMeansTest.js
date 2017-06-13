"use strict";

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const kMeans = require('../lib/kMeans.js');
const VectorOperations = require('../lib/vectorOperations');


describe('k Mens module tests', function () {


    describe('clustering tests', ()=>{

        it("test clustering flow", ()=>{

            // algorithm will converge consistently on this data
            let km = kMeans([[1,1,1],[2,2,2],[100,100,100],[99,99,99],[0,0,0]],2,100);

            // run algorithm
            let clusters = km.kMeansClustering();

            // sort the clusters according to the first dimension in the mean
            clusters.sort((c1,c2)=>{

                let m1 = c1.getMean()[0];
                let m2 = c2.getMean()[0];

                if (m1 > m2) {
                    return 1;
                }
                else if (m1 < m2) {
                    return -1;
                }
                else {
                    return 0;
                }
            });

            console.log("");
            console.log("test clustering flow")

            // print the results
            for (let cluster of clusters)
            {
                console.log("=========");
                console.log("mean: " + cluster.getMean());
                console.log("size: " + cluster.getObservations().length);
                console.log("observations: " + JSON.stringify(cluster.getObservations()));
            }

            clusters.should.be.an('array');
            clusters.length.should.equal(2);

            // first cluster size should be 3
            clusters[0].getObservations().length.should.equal(3);

            // first cluster mean should be 1,1,1
            let m1 = clusters[0].getMean();
            VectorOperations.isEqual(m1,[1,1,1]).should.be.ok;

            // 2nd cluster size should be 2
            clusters[1].getObservations().length.should.equal(2);

            // 2nd cluster mean should be 99.5,99.5,99.5
            let m2 = clusters[1].getMean();
            VectorOperations.isEqual(m2,[99.5,99.5,99.5]).should.be.ok;
        });


        it("test uneven clusters flow", ()=>{

            let km = kMeans([[1,1,1],[100,100,98],[98,100,98],[102,100,100],[99,99,97],[101,101,97]],2,100);

            // run algorithm
            let clusters = km.kMeansClustering();

            // sort the clusters according to the first dimension in the mean
            clusters.sort((c1,c2)=>{

                let m1 = c1.getMean()[0];
                let m2 = c2.getMean()[0];

                if (m1 > m2) {
                    return 1;
                }
                else if (m1 < m2) {
                    return -1;
                }
                else {
                    return 0;
                }
            });

            clusters.should.be.an('array');
            clusters.length.should.equal(2);

            // first cluster size should be 1
            clusters[0].getObservations().length.should.equal(1);

            // first cluster mean should be 1,1,1
            let m1 = clusters[0].getMean();
            VectorOperations.isEqual(m1,[1,1,1]).should.be.ok;

            // 2nd cluster size should be 5
            clusters[1].getObservations().length.should.equal(5);

            // 2nd cluster mean should be 100,100,98
            let m2 = clusters[1].getMean();
            VectorOperations.isEqual(m2,[100,100,98]).should.be.ok;
        });

    });

    describe('input validation tests', ()=>{

       it('input validation - missing input parameters', ()=>{

           let km = kMeans([[1,1],[2,2],[3,3]],2);
           expect( ()=> km.kMeansClustering()).to.throw(Error,"input error - missing parameters");
       });

       it('input validation - number of clusters nan', ()=>{

            let km = kMeans([[1,1],[2,2],[3,3]],"k",10);
            expect( ()=> km.kMeansClustering()).to.throw(Error,"input error - number of clusters should be a positive number");
        });

        it('input validation - max iterations nan', ()=>{

            let km = kMeans([[1,1],[2,2],[3,3]],2,"hello");
            expect( ()=> km.kMeansClustering()).to.throw(Error,"input error - maxIterations should be a positive number");
        });


        it('input validation - more clusters than observations', ()=>{

            // we have 4 clusters and only 3 observations
            let km = kMeans([[1,1],[2,2],[3,3]],4,100);
            expect( ()=> km.kMeansClustering()).to.throw(Error,"input error - number of clusters is larger than number of observations");
        });


        it('input validation - data set not an array', ()=>{

            let km = kMeans("input",4,100);
            expect( ()=> km.kMeansClustering()).to.throw(Error,"input error - data set must be an array");
        });

        it('input validation - empty observations', ()=>{

            let km = kMeans([[],[],[]],2,100);
            expect( ()=> km.kMeansClustering()).to.throw(Error,"input error - observation must be a non empty array");
        });

        it('input validation - nan observations', ()=>{

            let km = kMeans([[1,1],[2,1],[2,"hello"]],2,100);
            expect( ()=> km.kMeansClustering()).to.throw(Error,"input error - observation must contain numbers only");
        });

        it('input validation - observations with different dimensions', ()=>{

            let km = kMeans([[1,1],[2,1],[2,1,2]],2,100);
            expect( ()=> km.kMeansClustering()).to.throw(Error,"input error - all observations must have the same dimensions");
        });

    });

});