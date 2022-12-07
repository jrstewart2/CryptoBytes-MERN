'use strict';

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../index");
const { portfolioModel } = require("../schema.js");


describe("Portfolio Testing", () => {
    let testPortfolio;

    beforeEach(async () => {
        try {
            await portfolioModel.deleteMany({});
            testPortfolio = await portfolioModel.create({
                _id: "BTC",
                name: "Bitcoin",
                crypto: 1.5
            });
            testPortfolio = JSON.parse(JSON.stringify(testPortfolio));
        } catch (err) {
            console.error(err)
        }
    })


    it("should add ETH to portfolio", (done) => {
        const newInvestment = {
            _id: "ETH",
            name: "Ethereum",
            crypto: 0.75
        }
        chai.request(server).post("/addInvestment").send(newInvestment).end((err, res) => {
            chai.expect(err).to.be.null;
            chai.expect(res.status).to.equal(201);
            chai.expect(res.body).to.include(newInvestment);
            done();
        })
    })
    it("should update Bitcoin investment to 0.25", (done) => {
        const updatePortfolio = {
            _id: "BTC",
            name: "Bitcoin",
            crypto: 0.25
        }
        chai.request(server).patch(`/updatePortfolio/${testPortfolio._id}`).send(updatePortfolio).end((err, res) => {
            chai.expect(err).to.be.null;
            chai.expect(res.status).to.equal(200);
            chai.expect(res.body).to.deep.include(updatePortfolio);
            done();
        })
    })
    it("should get the test portfolio of BTC", (done) => {
        chai.request(server).get(`/getPortfolio/${testPortfolio._id}`).end((err, res) => {
            chai.expect(err).to.be.null;
            chai.expect(res.status).to.equal(200);
            chai.expect(res.body).to.deep.include(testPortfolio);
            done();
        })
    })
    it("should delete the test Portfolio", (done) => {
        chai.request(server).delete(`/delete/${testPortfolio._id}`).end((err, res) => {
            chai.expect(err).to.be.null;
            chai.expect(res.status).to.equal(201);
            chai.expect(res.body).to.deep.include(testPortfolio);
            done();
        })
    })
})
