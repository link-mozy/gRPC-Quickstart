import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function CustomCard(props) {
    let {info, incrementCount} = props;

    return (
        <Card style={{}}>
            <CardMedia component="img" height="450" src={`${info.images}`} alt={`${info.alternative}`} />
            <CardActions >
                <IconButton aria-label="like" onClick={() => incrementCount(info._id, "like")}>
                    <ThumbUpIcon />
                </IconButton>
                <IconButton aria-label="dislike" onClick={() => incrementCount(info._id, "dislike")}>
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

export default CustomCard;