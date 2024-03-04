use std::net::SocketAddr;
use service::{like_program::like_program_server::LikeProgramServer, LikeProgramService};
use tonic::transport::Server;

mod service;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let address: SocketAddr = "[::1]:8080".parse().unwrap();
    let like_service: LikeProgramService = LikeProgramService::default();
    
    Server::builder()
        .add_service(LikeProgramServer::new(like_service))
        .serve(address)
        .await?;
    Ok(())
}
