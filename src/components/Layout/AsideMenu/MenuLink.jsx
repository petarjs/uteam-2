import { MenuItem, Box } from '@chakra-ui/react';

import MENU_TYPE from 'constants/menu-type';

function MenuLink({ menuType, children, innerRef, active }) {
  if (menuType === MENU_TYPE.MOBILE) {
    return <MenuItem>{children}</MenuItem>;
  } else {
    return (
      <Box
        mt=".7rem"
        borderLeft={active ? '4px solid white' : '4px solid transparent'}
        ref={innerRef}
      >
        {children}
      </Box>
    );
  }
}

export default MenuLink;
