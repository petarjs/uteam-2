import { Heading, Avatar, Box, Center, Text, Stack, Button, Tag, TagLabel } from '@chakra-ui/react';
import moment from 'moment';

import { API_URL } from 'config/config.js';

function ProfileCard({ profileData, onDelete, handleOnDetails, profileId }) {
  return (
    <Center py={6}>
      <Box
        w={'200px'}
        bgGradient="linear(color.backgroundLight 20%, color.background 100%)"
        boxShadow={'2xl'}
        color={'white'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'2xl'}
          src={API_URL + profileData?.profilePhoto?.data?.attributes.url}
          alt={'Avatar Alt photo'}
          mb={4}
          pos={'relative'}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {profileData?.name}
        </Heading>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          Joined{' '}
          {moment(profileData?.createdAt.substring(0, 10), 'YYYY-MM-DD').format('MMMM Do YYYY')}
        </Text>
        <Tag size={'lg'} borderRadius="full" variant="solid" colorScheme="yellow">
          <TagLabel>{profileData?.status.toUpperCase()}</TagLabel>
        </Tag>

        <Stack mt={8} direction={'row'} spacing={8}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'md'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
            onClick={() => handleOnDetails(profileId)}
          >
            Details
          </Button>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'md'}
            bg={'red.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(255 99 71 / 48%), 0 10px 10px -5px rgb(255 99 71 / 43%)'
            }
            _hover={{
              bg: 'red.500',
            }}
            _focus={{
              bg: 'red.500',
            }}
            onClick={() => onDelete(profileData?.name, profileId)}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}

export default ProfileCard;
