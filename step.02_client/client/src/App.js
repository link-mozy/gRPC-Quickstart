import React, {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomCard from './components/CustomCard';

import infosJson from "./resources/infos.json";
import { LikeProgramClient } from "./like_program_grpc_web_pb";
import { LikeRequest } from "./like_program_pb";

export default function App() {
  const client = new LikeProgramClient("http://localhost:8080");

  let [infos, setInfos] = useState([]);

  const incrementCount = (infoId, likeCount) => {
    const request = new LikeRequest();

    request.setNumber(likeCount);
    client.like(request, {}, (err, response) => {
      infos.map((_) => {
        if(_._id == infoId) _.likeCount = response.getNumber();
        return _;
      })
      const _infos = [...infos];
      setInfos(_infos);
    });
  }

  const decrementCount = (infoId, dislikeCount) => {
    /**  
     * 직접 코딩해주세요.
     **/
  }

  useEffect(() => {
    setInfos(infosJson);
  },[]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          좋아요/별로에요 서비스
        </Typography>
        {infos.map((info) => {
          return (
            <CustomCard
              info={info}
              incrementCount={incrementCount}
              decrementCount={decrementCount}
            />
          )
        })}
      </Box>
    </Container>
  );
}
