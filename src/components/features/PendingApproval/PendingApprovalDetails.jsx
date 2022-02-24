import { Box, Heading, Flex, Button, Spacer, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import GoBack from 'components/features/GoBack/GoBack';
import AnswersInfo from 'components/features/PendingApproval/AnswersInfo';
import BasicInfo from 'components/Layout/MyProfile/BasicInfo';
import { getProfiles, deleteProfile, approveProfile, unapproveProfile } from 'services/profile';

function PendingApprovalDetails() {
  const [teamMember, setTeamMember] = useState();
  const [approved, setApproved] = useState(false);
  const params = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  async function findTeamMember(profileId) {
    const profiles = await getProfiles();
    console.log(
      'STTTTTTTT',
      profiles,
      profiles.data.find((profile) => profile.id == profileId)
    );
    setTeamMember(profiles.data.find((profile) => profile.id == profileId));
  }

  useEffect(() => {
    findTeamMember(params.pendingId);
  }, []);

  const onDelete = async (profileId) => {
    await deleteProfile(profileId);
    toast({
      description: 'Profile Deleted!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    navigate('/pending');
  };

  const onApprove = async (profileId) => {
    if (approved) {
      await unapproveProfile(profileId);
      toast({
        description: `Profile Unapproved!`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } else {
      await approveProfile(profileId);
      toast({
        description: `Profile Approved!`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    setApproved(true);
  };

  return (
    <Box p="1rem">
      <Flex maxW="1000px" alignItems={'center'}>
        <Heading mb="4rem">Moderate {teamMember?.attributes?.name}&apos;s entry</Heading>
        <Spacer />
        <Box>
          <Button
            mr="1rem"
            flex={1}
            fontSize={'2xl'}
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
            onClick={() => onApprove(teamMember?.id)}
          >
            {approved ? 'Unapprove' : 'Approve'}
          </Button>
          <Button
            flex={1}
            fontSize={'2xl'}
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
            onClick={() => onDelete(teamMember?.id)}
          >
            Delete
          </Button>
        </Box>
      </Flex>
      <GoBack />
      <Flex maxW="1000px" margin="auto" direction={{ base: 'column', smmd: 'row' }}>
        <BasicInfo currentUserProp={teamMember} />
        <AnswersInfo profileId={teamMember?.id} />
      </Flex>
    </Box>
  );
}

export default PendingApprovalDetails;
