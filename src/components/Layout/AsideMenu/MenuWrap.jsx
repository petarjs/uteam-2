import { MenuList, Box } from '@chakra-ui/react';

import MENU_TYPE from 'constants/menu-type';

function MenuWrap({ menuType, children }) {
  if (menuType === MENU_TYPE.MOBILE) {
    return <MenuList>{children}</MenuList>;
  } else {
    return <Box>{children}</Box>;
  }
}

export default MenuWrap;
