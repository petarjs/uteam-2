import { HStack, Spacer, Icon, Heading, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types'; // ES6
import { FaTeamspeak } from 'react-icons/fa';

import TopBarLink from './TopBarLink';

import { useAuthContext } from 'context/AuthContext.jsx';

function TopBar({ setIsLogged }) {
  const { handleLogout, isUserLoggedIn } = useAuthContext();
  const guestLinks = ['login', 'register'];
  const userLinks = ['logout', 'my-profile'];
  const links = isUserLoggedIn ? userLinks : guestLinks;

  const navBarHandleLogout = () => {
    handleLogout();
    setIsLogged(false);
  };

  return (
    <HStack
      pos="fixed"
      top="0"
      left="0"
      w="100%"
      p={{ base: '1rem', sm: '2rem', md: '3rem' }}
      h="100px"
      color="color.whiteText"
      bgGradient="linear(color.backgroundLight 50%, color.background 100%)"
    >
      <HStack>
        <Icon as={FaTeamspeak} fontSize="7xl"></Icon>
        <Heading as="h2" size="2xl">
          uTeam
        </Heading>
      </HStack>
      <Spacer />
      <HStack>
        <Flex alignItems="flex-end" flexDir={{ base: 'column', smmd: 'row' }}>
          {links.map((linkText, index) => (
            <TopBarLink text={linkText} key={index} handleLogout={navBarHandleLogout} />
          ))}
        </Flex>
      </HStack>
    </HStack>
  );
}

TopBar.propTypes = {
  isUserLoggedIn: PropTypes.bool,
};

export default TopBar;
