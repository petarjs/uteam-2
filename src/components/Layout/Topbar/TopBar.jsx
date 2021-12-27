import { HStack, Spacer, Icon, Heading, Button, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types'; // ES6
import { FaTeamspeak } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function TopBar({ isLogged, setIsLogged }) {
  let links;

  const handleLogout = () => {
    setIsLogged(false);
  };

  const makeLinkButton = (el, index) => {
    return (
      <Link
        key={index}
        to={`/${el}`}
        onClick={() => {
          if (el === 'logout') handleLogout();
        }}
      >
        <Button
          m=".2rem 0 .2rem 1rem"
          bg="color.buttonBlue"
          color="color.whiteText"
          _hover={{
            background: 'color.buttonBlueHover',
          }}
          mr="1rem"
        >
          <Text fontSize="2xl">{el}</Text>
        </Button>
      </Link>
    );
  };

  if (!isLogged) {
    links = ['login', 'register'].map((el, i) => makeLinkButton(el, i));
  } else {
    links = ['logout', 'my-profile'].map((el, i) => makeLinkButton(el, i));
  }

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
          {links}
        </Flex>
      </HStack>
    </HStack>
  );
}

TopBar.propTypes = {
  isLogged: PropTypes.bool,
};

export default TopBar;
