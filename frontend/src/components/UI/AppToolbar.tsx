import { NavLink } from 'react-router-dom';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import UserMenu from './UserMenu';
import AnonumousMenu from './AnonumousMenu';
const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
  marginRight: '20px'
});
const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/artists">Artists</Link>
            <Link to="/albums">Albums</Link>
            <Link to="/tracks">Tracks</Link>
          </Typography>
          {user ? (
            <UserMenu  user={user}/>
          ) : (
            <AnonumousMenu/>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
};
export default AppToolbar;