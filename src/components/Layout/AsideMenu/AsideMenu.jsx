import { ChevronDownIcon } from '@chakra-ui/icons';
import { VStack, Heading, Menu, MenuButton, Button } from '@chakra-ui/react';
import React from 'react';

import MenuItems from './MenuItems.jsx';

function SideMenu({ isLogged }) {
  if (isLogged)
    return (
      <React.Fragment>
        <VStack
          pos="fixed"
          top="100px"
          left="0"
          p="2rem"
          pt="4rem"
          bg="color.background"
          color="color.whiteText"
          height="100%"
          width="300px"
          bgGradient="linear(color.background 50%, color.backgroundLight 100%)"
          d={{ base: 'none', md: 'block' }}
        >
          <Heading size="xl" m="0 0 1rem 1rem">
            Menu
          </Heading>
          <Menu>
            <MenuButton d={{ md: 'none' }} as={Button} rightIcon={<ChevronDownIcon />}>
              Menu
            </MenuButton>
            <MenuItems menuType={'desktop'} />
          </Menu>
        </VStack>

        <VStack d={{ md: 'none' }} pos="fixed" top="100px" left="0" p="1.4rem">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Menu
            </MenuButton>
            <MenuItems menuType={'mobile'} />
          </Menu>
        </VStack>
      </React.Fragment>
    );
  else return <div></div>;
}

export default SideMenu;
