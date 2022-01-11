import { Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineTeam } from 'react-icons/ai';
import { MdOutlinePending } from 'react-icons/md';
import { RiQuestionnaireLine, RiInformationLine, RiProfileLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import MenuLink from './MenuLink';
import MenuWrap from './MenuWrap';

function MenuItems({ menuType }) {
  let menuItems;

  switch (menuType) {
    default:
      menuItems = [
        {
          href: '/pending-approval',
          icon: MdOutlinePending,
          text: 'Pending for approval',
        },
        {
          href: '/team',
          icon: AiOutlineTeam,
          text: 'Team',
        },
        {
          href: '/questions',
          icon: RiQuestionnaireLine,
          text: 'Questions',
        },
        {
          href: '/company-info',
          icon: RiInformationLine,
          text: 'Company Info',
        },
        {
          href: '/my-profile',
          icon: RiProfileLine,
          text: 'My Profile',
        },
      ];
      break;
  }

  return (
    <MenuWrap menuType={menuType}>
      {menuItems.map(({ text, icon, href }, i) => (
        <Link to={href} key={i}>
          <MenuLink menuType={menuType}>
            <Text fontSize="2xl">
              <Icon as={icon} mr="1rem" mt=".2rem"></Icon>
              {text}
            </Text>
          </MenuLink>
        </Link>
      ))}
    </MenuWrap>
  );
}

export default MenuItems;
