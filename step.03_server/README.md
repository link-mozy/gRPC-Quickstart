# 좋아요/별로에요 서버 개발 (cors 해결)

## gRPC Server (Rust)

개발환경
- Rust

## 서버 개발하기

### 1. 서버 소스코드 수정

`main` 함수의 내용을 수정합니다. `CorsLayer` 를 추가하여 서버를 생성하는 부분에 `http://127.0.0.1`, `http://localhost:3000` 으로 부터 오는 요청은 허용하도록 합니다.

```rust
#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let address: SocketAddr = "[::1]:8080".parse().unwrap();
    let like_service: LikeProgramService = LikeProgramService::default();
    // http://127.0.0.1, http://localhost:3000 허용 하도록 정책 추가
    let cors = CorsLayer::new()
        .allow_headers(Any)
        .allow_methods([Method::POST])
        .allow_origin(["http://127.0.0.1".parse()?,"http://localhost:3000".parse()?]);
    
    Server::builder()
        .accept_http1(true)
        .layer(cors) // CorsLayer 추가
        .layer(GrpcWebLayer::new())
        .add_service(LikeProgramServer::new(like_service))
        .serve(address)
        .await?;
    Ok(())
}
```

### 2. 서버 실행

`cargo` 명령어로 프로젝트 실행합니다.
```shell
cargo run
```