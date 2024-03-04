/**
 * @fileoverview gRPC-Web generated client stub for like_program
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v3.20.3
// source: like_program.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.like_program = require('./like_program_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.like_program.LikeProgramClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.like_program.LikeProgramPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.like_program.LikeRequest,
 *   !proto.like_program.LikeResponse>}
 */
const methodDescriptor_LikeProgram_Like = new grpc.web.MethodDescriptor(
  '/like_program.LikeProgram/Like',
  grpc.web.MethodType.UNARY,
  proto.like_program.LikeRequest,
  proto.like_program.LikeResponse,
  /**
   * @param {!proto.like_program.LikeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.like_program.LikeResponse.deserializeBinary
);


/**
 * @param {!proto.like_program.LikeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.like_program.LikeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.like_program.LikeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.like_program.LikeProgramClient.prototype.like =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/like_program.LikeProgram/Like',
      request,
      metadata || {},
      methodDescriptor_LikeProgram_Like,
      callback);
};


/**
 * @param {!proto.like_program.LikeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.like_program.LikeResponse>}
 *     Promise that resolves to the response
 */
proto.like_program.LikeProgramPromiseClient.prototype.like =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/like_program.LikeProgram/Like',
      request,
      metadata || {},
      methodDescriptor_LikeProgram_Like);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.like_program.LikeRequest,
 *   !proto.like_program.LikeResponse>}
 */
const methodDescriptor_LikeProgram_Dislike = new grpc.web.MethodDescriptor(
  '/like_program.LikeProgram/Dislike',
  grpc.web.MethodType.UNARY,
  proto.like_program.LikeRequest,
  proto.like_program.LikeResponse,
  /**
   * @param {!proto.like_program.LikeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.like_program.LikeResponse.deserializeBinary
);


/**
 * @param {!proto.like_program.LikeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.like_program.LikeResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.like_program.LikeResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.like_program.LikeProgramClient.prototype.dislike =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/like_program.LikeProgram/Dislike',
      request,
      metadata || {},
      methodDescriptor_LikeProgram_Dislike,
      callback);
};


/**
 * @param {!proto.like_program.LikeRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.like_program.LikeResponse>}
 *     Promise that resolves to the response
 */
proto.like_program.LikeProgramPromiseClient.prototype.dislike =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/like_program.LikeProgram/Dislike',
      request,
      metadata || {},
      methodDescriptor_LikeProgram_Dislike);
};


module.exports = proto.like_program;
