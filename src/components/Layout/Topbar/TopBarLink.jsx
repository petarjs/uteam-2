import { Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function TopBarLink({ handleLogout, text, index }) {
  return (
    <Link
      key={index}
      to={`/${text}`}
      onClick={() => {
        if (text === 'logout') handleLogout();
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
        <Text fontSize="2xl">{text}</Text>
      </Button>
    </Link>
  );
}

export default TopBarLink;
