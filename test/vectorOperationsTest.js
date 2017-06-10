"use strict";

const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const VectorOperations = require('../lib/vectorOperations.js');


describe('vectorOperations tests', ()=>{
   it('distance between vectors', ()=>{

       let v1 = [0,0];
       let v2 = [3,4];

       let distance = VectorOperations.distance(v1,v2);
       distance.should.equal(5);

       let v3 = [2,3,4,2];
       let v4 = [1,-2,1,3];

       distance = VectorOperations.distance(v3,v4);
       distance.should.equal(6);
   });

    it('distance between vectors with different dimensions', ()=>{

        let v1 = [0,0];
        let v2 = [3,4,1];

        expect(() =>  VectorOperations.distance(v1,v2)).to.throw(Error, "vectors must be of the same dimensions");
    });

    it('distance between vectors with bad input', ()=>{

        let v1 = [0,'hello'];
        let v2 = [3,0];

        expect(() =>  VectorOperations.distance(v1,v2)).to.throw(Error, "vectors must contain numbers only");
    });

    it('equality between vectors', ()=>{

        let v1 = [1,1,1];
        let v2 = [1,1,1];

        VectorOperations.isEqual(v1,v2).should.be.ok;

        let v3 = [1,1,2];

        VectorOperations.isEqual(v1,v3).should.be.false;
    });

    it('equality between vectors of different length', ()=>{

        let v1 = [1,1];
        let v2 = [1,1,1];

        VectorOperations.isEqual(v1,v2).should.be.false;
    });

    it('equality between vectors with bad input', ()=>{

        let v1 = [1,'one'];
        let v2 = [1,1,1];

        expect( ()=> VectorOperations.isEqual(v1,v2)).to.throw(Error,"vectors must contain numbers only");
    });


});