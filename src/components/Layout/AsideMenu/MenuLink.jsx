import { MenuItem, Box } from '@chakra-ui/react';

import MENU_TYPE from 'constants/menu-type';

function MenuLink({ menuType, children }) {
  if (menuType === MENU_TYPE.MOBILE) {
    return <MenuItem>{children}</MenuItem>;
  } else {
    return <Box mt=".7rem">{children}</Box>;
  }
}

export default MenuLink;
