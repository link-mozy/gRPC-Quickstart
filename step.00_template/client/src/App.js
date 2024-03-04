import React, {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomCard from './components/CustomCard';

import infosJson from "./resources/infos.json";

export default function App() {
  let [infos, setInfos] = useState([]);

  let incrementCount = (infoId, type) => {
    infos = infos.map((info) => {
      if ((info._id) == infoId) {
        if ("like" == type) info.likeCount = info.likeCount + 1;
        else info.dislikeCount = info.dislikeCount - 1;
      }
      return info;
    });
    setInfos(infos);
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
            />
          )
        })}
      </Box>
    </Container>
  );
}
