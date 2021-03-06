"use strict";

const opcua = require("node-opcua");
const should = require("should");
const async = require("async");

const assert = require("node-opcua-assert").assert;

const OPCUAServer = opcua.OPCUAServer;
const OPCUAClient = opcua.OPCUAClient;

const OPCUADiscoveryServer = require("node-opcua-server-discovery").OPCUADiscoveryServer;

const perform_findServers = opcua.perform_findServers;

// add the tcp/ip endpoint with no security

function f(func,callback) {
    func(callback);
}
const describe = require("node-opcua-leak-detector").describeWithLeakDetector;
describe("Discovery server", function () {

    this.timeout(10000);
    let discovery_server, discovery_server_endpointUrl;

    let server;

    function start_discovery_server(callback) {
        discovery_server.start(callback);
    }

    function stop_discovery_server(callback) {
        discovery_server.shutdown(callback);
    }


    function start_server(callback) {
    }

    function stop_server(callback) {

    }

    before(function () {
        OPCUAServer.registry.count().should.eql(0);

        discovery_server = new OPCUADiscoveryServer({port: 1240});
        discovery_server_endpointUrl = discovery_server._get_endpoints()[0].endpointUrl;
    });
    after(function (done) {
        OPCUAServer.registry.count().should.eql(0);
        done();
    });

    beforeEach(function (done) {
        done();
    });

    afterEach(function (done) {
        done();
    });

    it("a server shall register itself to the LDS when the LDS comes online", function (done) {
        async.series([
            // given a up and running LDS
            start_discovery_server.bind(),
            function (callback) {
                server = new OPCUAServer({port: 1435});
                server.registerServerManager.timeout = 100;
                // when server starts
                // it should end up registering itself to the LDS
                server.once("serverRegistered", function () {
                    //xx console.log("server serverRegistered");
                    callback();
                });
                server.start(function () {
                    server.registerServer(discovery_server_endpointUrl, function () {//
                    });
                });
            },
            function (callback) {
                // when the server shuts down
                // it should unregistered itself from the LDS
                server.once("serverUnregistered", function () {
                    //xx console.log("server serverUnregistered");
                });
                server.shutdown(function () {
                    callback();
                });
            },
            stop_discovery_server.bind()
        ], done);
    });

    it("a server shall register itself on a regular basic to the LDS", function (done) {
        async.series([
            // given a up and running LDS
            start_discovery_server.bind(),
            function (callback) {
                server = new OPCUAServer({port: 1435});
                server.registerServerManager.timeout = 100;
                // when server starts
                // it should end up registering itself to the LDS
                server.once("serverRegistered", function () {
                    //xx console.log("server serverRegistered");
                    callback();
                });
                server.start(function () {
                    server.registerServer(discovery_server_endpointUrl, function () {//
                    });
                });
            },
            function (callback) {
                server.once("serverRegistrationRenewed", function () {
                    //xx console.log("server serverRegistrationRenewed");
                    callback();
                });
            },
            function (callback) {
                server.once("serverRegistrationRenewed", function () {
                    //xx console.log("server serverRegistrationRenewed");
                    callback();
                });
            },
            function (callback) {
                // when the server shuts down
                // it should unregistered itself from the LDS
                server.once("serverUnregistered", function () {
                    //xx console.log("server serverUnregistered");
                });
                server.shutdown(function () {
                    callback();
                });
            },
            stop_discovery_server.bind()
        ], done);

    });

    it("a server shall register try itself even if discovery server is not available", function (done) {
        async.series([

            // given a server that starts before the LDS
            function (callback) {
                server = new OPCUAServer({port: 1435});
                server.registerServerManager.timeout = 100;
                // when server starts
                // it should end up registering itself to the LDS
                server.start(function () {
                    server.registerServer(discovery_server_endpointUrl, function () {//
                    });
                });
                server.once("serverRegistrationPending", function () {
                    //xx console.log("server serverRegistrationPending");
                    callback();
                });
            },
            function(callback){
                server.once("serverRegistrationPending", function () {
                    //xx console.log("server serverRegistrationPending");
                    callback();
                });

            },
            // when discovery server starts ....
            start_discovery_server.bind(),

            function(callback){
                server.once("serverRegistered", function () {
                    //xx console.log("server serverRegistered");
                    callback();
                });
            },

            function (callback) {
                server.once("serverRegistrationRenewed", function () {
                    //xx console.log("server serverRegistrationRenewed");
                    callback();
                });
            },
            function (callback) {
                server.once("serverRegistrationRenewed", function () {
                    //xx console.log("server serverRegistrationRenewed");
                    callback();
                });
            },
            function (callback) {
                // when the server shuts down
                // it should unregistered itself from the LDS
                server.once("serverUnregistered", function () {
                    //xx console.log("server serverUnregistered");
                });
                server.shutdown(function () {
                    callback();
                });
            },
            stop_discovery_server.bind()
        ], done);

    });

    it("a server shall be able not to register itself to the LDS if needed to be hidden", function(done){
        async.series([

            function (callback) {
                server = new OPCUAServer({port: 1435});
                server.registerServerManager.timeout = 100;
                server.start(function () {
                    callback();
                });
            },
            function (callback) {
                server.shutdown(function () {
                    callback();
                });
            },
        ], done);

    });
});