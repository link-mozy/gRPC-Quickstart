use std::net::SocketAddr;
use service::{like_program::like_program_server::LikeProgramServer, LikeProgramService};
use tonic::transport::Server;
use tonic_web::GrpcWebLayer;
use tower_http::cors::{Any, CorsLayer};
use http::Method;

mod service;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let address: SocketAddr = "[::1]:8080".parse().unwrap();

    let like_service: LikeProgramService = LikeProgramService::default();

    let cors = CorsLayer::new()
        .allow_headers(Any)
        .allow_methods([Method::POST])
        .allow_origin(["http://127.0.0.1".parse()?,"http://localhost:3000".parse()?]);
    
    Server::builder()
        .accept_http1(true)
        .layer(cors)
        .layer(GrpcWebLayer::new())
        .add_service(LikeProgramServer::new(like_service))
        .serve(address)
        .await?;
    Ok(())
}