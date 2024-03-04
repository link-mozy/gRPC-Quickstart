# 좋아요/별로에요 클라이언트 개발

## gRPC Client (React)

개발환경
- React

## 클라이언트 개발하기

### 0. (환경설치) `protoc` 설치

`Homebrew` 를 사용하여 `protoc-gen-grpc-web` 을 설치합니다. (OS: MacOS)

```shell
brew install protoc-gen-grpc-web
```

### 1. 템플릿 프로젝트 내려받기

[step.00_template/client](../step.00_template/client/) 프로젝트를 내려받습니다.

### 2. protocol buffres 작성

`proto` 폴더를 생성합니다.

```shell
# 폴더 위치 : client/proto
mkdir proto
```

클라이언트에도 `like_program.proto` 파일을 작성합니다.(파일위치: proto/like_program.proto)  
`like_program.proto` 파일 내용:  
```text
syntax = "proto3";
package like_program;

message LikeRequest {
    int32 number = 1;
}

message LikeResponse {
    int32 number = 1;
}

service LikeProgram {
    rpc Like (LikeRequest) returns (LikeResponse);
    rpc Dislike (LikeRequest) returns (LikeResponse);
}

```

### 3. `protoc` 제너레이터 실행 (output : Javascript)

`protoc` 를 사용하여 앞에서 작성한 `proto` 파일 내용으로 서비스를 생성합니다.  
`protoc` 명령어(사용법):  
```shell
protoc -I $PROTO_DIR \
--js_out=import_style=commonjs:$OUTPUT_DIR \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:$OUTPUT_DIR \
$FILE_PATH
```
`protoc` 명령어(예시):  
```shell
protoc -I proto \
--js_out=import_style=commonjs:./src \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:./src \
./proto/like_program.proto
```

자바스크립트 파일로 `like_program_grpc_web_pb.js`, `like_program_pb.js` 파일이 자동으로 생성됩니다.  
폴더 구조:  
```text
client
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── proto
│   └── like_program.proto
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── test.jpeg
└── src
    ├── App.js
    ├── components
    ├── index.js
    ├── like_program_grpc_web_pb.js # protoc 가 생성한 파일
    ├── like_program_pb.js          # protoc 가 생성한 파일
    ├── resources
    └── theme.js
```

### 4. gRPC 통신 기능 추가하기

버튼을 클릭하면 서버에 좋아요(더하기)/별로에요(빼기) 서비스 통신하도록 기능을 추가합니다.  

__incrementCount 함수 수정__

`App.js` 파일에서 `incrementCount` 함수의 내용을 수정하여 좋아요(더하기) 서비스 통신하도록 수정합니다. 
수정하는 기능은 다음과 같습니다.  
1. `LikeRequest` 구조체 `number` 변수에 `likeCount` 값을 저장한다.
2. `like` 서비스를 요청한다. (값을 전달)
3. `LikeResponse` 구조체 `number` 변수값을 받아 `likeCount` 값을 변경한다. (`like` 서비스 응답)

```javascript
// 함수 인자값 수정 : (infoId, type) → (infoId, likeCount)
const incrementCount = (infoId, likeCount) => {
const request = new LikeRequest(); // LikeRequest 생성

request.setNumber(likeCount); // LikeRequest.number 변수에 likeCount 저장
client.like(request, {}, (err, response) => { // like 서비스 응답(gRPC)
  infos.map((_) => {
    if(_._id == infoId) _.likeCount = response.getNumber();
    return _;
  })
  const _infos = [...infos];
  setInfos(_infos); // 수정된 내용 리엑트 변수에 반영
});
}
```

추가로 `decrementCount` 함수는 여러분이 `incrementCount` 함수를 참고하여 작성해보세요😋  

__CustomCard 컴포넌트 수정__

그리고 `CustomCard` 컴포넌트도 수정합니다.  
`App.js` _return_ 함수부분:  
```javascript
return (
<CustomCard
  info={info}
  incrementCount={incrementCount}
  decrementCount={decrementCount} // decrementCount 추가
/>
)
```
`CustomCard.js` 파일:
```javascript
function CustomCard(props) {
    let {info, incrementCount, decrementCount} = props; // decrementCount 추가

    return (
        <Card style={{}}>
            <CardMedia component="img" height="450" src={`${info.images}`} alt={`${info.alternative}`} />
            <CardActions >
                // 함수 인자값 수정 : (infoId, type) → (infoId, likeCount)
                <IconButton aria-label="like" onClick={() => incrementCount(info._id, info.likeCount)}> 
                    <ThumbUpIcon />
                </IconButton>
                <IconButton aria-label="like" onClick={() => decrementCount(info._id, info.dislikeCount)}>
                    <ThumbDownIcon />
                </IconButton>
            </CardActions>
            <CardContent>
                <Typography variant="body2">
                    좋아요 {info.likeCount}
                </Typography>
                <Typography variant="body2">
                    별로에요 {info.dislikeCount}
                </Typography>
            </CardContent>
        </Card>
    )
}
```

### 5. 프로젝트 실행

`npm` 명령어로 프로젝트를 실행합니다.

```shell
npm start
```

### 6. net::ERR_INVALID_HTTP_RESPONSE 이슈

클라이언트에서 좋아요(더하기) 서비스로 요청을 하면 에러가 발생합니다. 그 이유는 클라이언트와 서버간 통신에서 __CORS__ 에러가 발생합니다.  
해결하기 위해 앞에서 개발한 서버 소스코드를 수정할 필요가 있습니다.  
[다음 스탭](../step.03_server/README.md)에서 서버 소스코드를 수정하여 해결하도록 하겠습니다.  