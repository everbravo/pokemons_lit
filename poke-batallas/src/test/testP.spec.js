var MyClass = require('../application/testP.js');
var myObj = new MyClass();
var chai = require("chai");
var sinon = require("sinon");
var expect = chai.expect;
var assert = chai.assert;

describe("Test suit", function() {
    it("Test the add method", function() {
        //assert.equal(myObj.add(2,2), 4);
        expect(myObj.add(2,2)).to.be.equals(4);
    });


    it("spy the add method", function() {
        var spy = sinon.spy(myObj, "add");
        var ar1 = 10, ar2 = 11;
        myObj.callAnotherFunc(ar1, ar2);
        //sinon.assert.calledTwice(spy);
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(10,11)).to.be.true;
    });
});