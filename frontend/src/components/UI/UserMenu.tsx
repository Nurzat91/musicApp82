import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../types';

interface Props {
  user: User;
}
const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {//открытие
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {//закрытие
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.username}!
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;