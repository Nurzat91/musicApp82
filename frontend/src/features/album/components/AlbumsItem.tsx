import React from 'react';
import {
  Card,
  CardMedia,
  Grid,
  Typography,
  styled,
  CardContent,
  CardActions,
  IconButton,
  Box,
  Button, CircularProgress
} from '@mui/material';
import { apiURL } from '../../../constants';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { publishLoading, removeLoading } from '../albumSlice';
import { deleteAlbum, fetchAlbum, publishedAlbum } from '../albumThunks';

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});
interface Props {
  id: string;
  title: string;
  year: number;
  image: string | null;
  isPublished: boolean;
}
const AlbumsItem: React.FC<Props>  = ({id, title, year, image, isPublished}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const deleting = useAppSelector(removeLoading);
  const toggling = useAppSelector(publishLoading);

  let cardImage;
  if (image) {
    cardImage = image ? apiURL + '/' + image : '';
  }

  const remove = async (id: string) => {
    await dispatch(deleteAlbum(id)).unwrap();
    await dispatch(fetchAlbum(id));
  };

  const published = async (id: string) => {
    await dispatch(publishedAlbum(id));
    await dispatch(fetchAlbum(id));
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card id={id} sx={{height: '100%'}}>
        <Typography variant="h5" m={2}>{title}</Typography>
        <CardContent>
          <Typography variant="h6" m={2} sx={{height: '80px'}}>{year}</Typography>
        </CardContent>
        {cardImage && <ImageCardMedia image={cardImage} />}
        <CardActions sx={{ marginTop: '10px'}}>
          {user?.role === 'admin' &&
            <Grid>
              <Typography sx={{ marginY: '10px'}}>{isPublished ? '' : 'Album was not published yet'} </Typography>
              <Box>
                <Button
                  sx={{ marginRight: '10px'}}
                  variant="contained"
                  onClick={() => remove(id)}
                  disabled={deleting}
                >
                  {deleting ?
                    <Box sx={{display: 'flex'}}>
                      <CircularProgress/>
                    </Box> : 'Delete'
                  }
                </Button>

                <Button
                  variant="contained"
                  onClick={() => published(id)}
                  disabled={toggling}
                >
                  {toggling ?
                    <Box sx={{display: 'flex'}}>
                      <CircularProgress/>
                    </Box> : isPublished ? 'Unpublish' : 'Publish'
                  }
                </Button>
              </Box>
            </Grid>
          }
        </CardActions>
        <IconButton
          component={Link}
          to={'/tracks/' + id}
        >
          <ArrowForwardIcon/>
        </IconButton>
      </Card>
    </Grid>
  );
};

export default AlbumsItem;