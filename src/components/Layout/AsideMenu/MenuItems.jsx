import { MenuList, Icon, MenuItem, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { MdOutlinePending } from 'react-icons/md';
import { RiQuestionnaireLine, RiInformationLine, RiProfileLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function MenuWrap({ menuType, children }) {
  if (menuType === 'mobile') {
    return <MenuList>{children}</MenuList>;
  } else {
    return <Box>{children}</Box>;
  }
}

function MenuLink({ menuType, children }) {
  if (menuType === 'mobile') {
    return <MenuItem>{children}</MenuItem>;
  } else {
    return <Box mt=".7rem">{children}</Box>;
  }
}

function MenuItems({ menuType }) {
  let nav;

  switch (menuType) {
    default:
      nav = (
        <MenuWrap menuType={menuType}>
          <Link to="/pending-approval">
            <MenuLink menuType={menuType}>
              <Text fontSize="2xl">
                <Icon as={MdOutlinePending} mr="1rem" mt=".2rem"></Icon>
                Pending for approval
              </Text>
            </MenuLink>
          </Link>
          <Link to="/team">
            <MenuLink menuType={menuType}>
              <Text fontSize="2xl">
                <Icon as={AiOutlineTeam} mr="1rem" mt=".2rem"></Icon>
                Team
              </Text>
            </MenuLink>
          </Link>
          <Link to="/questions">
            <MenuLink menuType={menuType}>
              <Text fontSize="2xl">
                <Icon as={RiQuestionnaireLine} mr="1rem" mt=".2rem"></Icon>
                Questions
              </Text>
            </MenuLink>
          </Link>
          <Link to="/company-info">
            <MenuLink menuType={menuType}>
              <Text fontSize="2xl">
                <Icon as={RiInformationLine} mr="1rem" mt=".2rem"></Icon>
                Company Info
              </Text>
            </MenuLink>
          </Link>
          <Link to="/my-profile">
            <MenuLink menuType={menuType}>
              <Text fontSize="2xl">
                <Icon as={RiProfileLine} mr="1rem" mt=".2rem"></Icon>
                My Profile
              </Text>
            </MenuLink>
          </Link>
        </MenuWrap>
      );
      break;
  }
  return nav;
}

export default MenuItems;
