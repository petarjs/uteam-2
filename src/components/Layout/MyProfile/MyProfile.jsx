import { Flex, Heading, Box } from '@chakra-ui/react';
import React from 'react';

import BasicInfo from './BasicInfo';
import SecurityInfo from './SecurityInfo';

function MyProfile() {
  return (
    <Box p="1rem">
      <Heading mb="1rem">My Profile</Heading>
      <Flex maxW="1000px" margin="auto" direction={{ base: 'column', smmd: 'row' }}>
        <BasicInfo />
        <SecurityInfo />
      </Flex>
    </Box>
  );
}

export default MyProfile;
