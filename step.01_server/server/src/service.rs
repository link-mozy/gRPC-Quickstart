use tonic::{Request, Response, Status};
use like_program::{LikeRequest, LikeResponse, like_program_server::LikeProgram};

pub mod like_program {
    include!("like_program.rs");
}

#[derive(Debug, Default)]
pub struct LikeProgramService {}

#[tonic::async_trait]
impl LikeProgram for LikeProgramService {
    async fn like(
        &self,
        requst: Request<LikeRequest>
    ) -> Result<Response<LikeResponse>, Status> {
        let req = requst.into_inner();
        let mut number: i32 = req.number;
        // println!("request::number: {:?}", number);
        number += 1;
        Ok(Response::new(like_program::LikeResponse {
            number
        }))
    }

    async fn dislike(
        &self,
        requst: Request<LikeRequest>
    ) -> Result<Response<LikeResponse>, Status> {
        let req = requst.into_inner();
        let mut number: i32 = req.number;
        // println!("request::number: {:?}", number);
        number -= 1;
        Ok(Response::new(like_program::LikeResponse {
            number
        }))
    }
}