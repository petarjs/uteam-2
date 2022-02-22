import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Heading,
  Grid,
  GridItem,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

import ProfileCard from 'components/features/PendingApproval/ProfileCard';
import { getProfiles, deleteProfile } from 'services/profile';

function PendingApproval() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileNameModal, setProfileNameModal] = useState('');
  const [profileId, setProfileId] = useState();
  const [profilesArr, setProfilesArr] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const getProfilesAsync = async () => {
    const profiles = await getProfiles();
    const pendingProfiles = profiles.data.filter(
      (profile) => profile.attributes.status === 'pending'
    );
    console.log('.......profiles sort them noww', pendingProfiles);
    setProfilesArr(pendingProfiles);
  };

  useEffect(() => {
    getProfilesAsync();
  }, []);

  const handleDeleteClick = (profileName, profileId) => {
    console.log('prfoile namee', profileName, profileId);
    setProfileId(profileId);
    setProfileNameModal(profileName);
    onOpen();
  };

  const handleDeleteConfirm = async () => {
    await deleteProfile(profileId);
    toast({
      description: 'Profile Deleted!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    onClose();
    getProfilesAsync();
  };

  const handleOnDetails = (profileId) => {
    console.log('prfoile idd', profileId);
    navigate(`/pending/${profileId}`);
  };

  return (
    <Box p="1rem">
      <Heading mb="4rem">Pending for approval</Heading>
      <Grid
        p="1rem"
        gap="10"
        templateRows="repeat(auto-fit, minmax(150px, 250px))"
        templateColumns="repeat(auto-fit, minmax(220px, 1fr));"
        maxW="1000px"
        margin={'auto'}
      >
        {profilesArr.map((profileData) => (
          <GridItem d="flex" alignItems="center" justifyContent="center" key={profileData.id}>
            <ProfileCard
              profileData={profileData.attributes}
              onDelete={handleDeleteClick}
              profileId={profileData.id}
              handleOnDetails={handleOnDetails}
            />
          </GridItem>
        ))}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent top="20%">
          <ModalHeader>{profileNameModal + "'s profile"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this profile?</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={() => handleDeleteConfirm()}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default PendingApproval;
