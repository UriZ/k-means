"use strict";

const chai = require('chai');
const should = chai.should();
const Cluster = require('../lib/cluster.js');

describe('Cluster tests', function() {

    it('mean calculation', function() {

        let c = new Cluster([1,1,1]);

        c.addDataSet([1,1,1]);
        c.addDataSet([2,2,2]);
        c.addDataSet([3,3,3]);

        c.calculateMean();

        let mean = c.getMean();

        mean.should.be.an('array');
        for (let dimension of mean)
        {
            dimension.should.equal(2);
        }
    });


    it('mean calculation with empty cluster', ()=>{

        let zero = [0,0,0];

        let c = new Cluster(zero);

        // this should not change the mean
        c.calculateMean();

        let mean = c.getMean();

        mean.should.be.an('array');
        mean.should.equal(zero);

    });
})

