import {
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Avatar,
  Center,
  useToast,
} from '@chakra-ui/react';
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useLayoutEffect, useState } from 'react';

import { API_URL } from 'config/config.js';
import { useAuthContext } from 'context/AuthContext.jsx';

function BasicInfo({ currentUserProp }) {
  let { currentUser, changeUsername, changeUserPhoto } = useAuthContext();
  const [currentProfile, setCurrentProfile] = useState(currentUser);
  console.log('pocinje basic infooo', currentUser, currentProfile);
  const [nameInput, setNameInput] = useState(currentProfile?.username);
  const [profilePhoto, setProfilePhoto] = useState(API_URL + currentProfile?.imagePathURL);
  const [profilePhotoFile, setProfilePhotoFile] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();
  console.log('Ideee name input??', nameInput);
  const handleNameChange = (e) => setNameInput(e.target.value);
  const isNameError = nameInput === '';

  useEffect(() => {
    console.log(
      'basic infoo?',
      currentUserProp,
      currentUser?.username,
      API_URL + currentUser?.imagePathURL
    );
    if (currentUserProp?.id) {
      console.log('........... ');
      setNameInput(currentUserProp?.attributes.name);
      setProfilePhoto(API_URL + currentUserProp?.attributes?.profilePhoto?.data?.attributes.url);
      setCurrentProfile({
        id: currentUserProp?.attributes.user.data?.id,
        username: currentUserProp?.attributes.name,
        imagePathURL: currentUserProp?.attributes.profilePhoto.data?.attributes.url,
      });
    }
  }, [currentUserProp]);

  const handleEditProfile = async (e) => {
    e.preventDefault();

    await changeUsername(currentProfile?.id, nameInput, false);

    console.log(
      'SLIKAKAAA',
      profilePhoto,
      API_URL + currentProfile?.imagePathURL,
      profilePhoto != API_URL + currentProfile?.imagePathURL
    );
    if (profilePhoto != API_URL + currentProfile?.imagePathURL) {
      const uploadFileData = new FormData();
      uploadFileData.append('files', profilePhotoFile);

      await changeUserPhoto(uploadFileData, currentProfile?.id);
    } else {
      console.log('profilna nije promenjena', profilePhoto);
    }

    toast({
      description: 'Changes saved.',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });

    setIsEditing(false);
  };

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    if (files && files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setProfilePhoto(e.target.result);
        setProfilePhotoFile(files[0]);
      };

      reader.readAsDataURL(files[0]);
    } else {
      console.log('CANCEL clicked!', profilePhoto);
      setProfilePhoto(API_URL + currentProfile?.imagePathURL);
    }
  };

  return (
    <Box w={{ base: '100%', smmd: '50%' }} maxW="700px" p="2rem">
      <Heading as="h3" size="md" mb="1rem">
        Basic Info:
      </Heading>
      <form onSubmit={handleEditProfile}>
        <FormControl isInvalid={isNameError} mb="1rem">
          <FormLabel htmlFor="name" fontSize="1.5rem">
            Name
          </FormLabel>
          <Input
            disabled={!isEditing}
            size="lg"
            id="name"
            type="text"
            value={nameInput}
            onChange={handleNameChange}
          />
          {!isNameError ? (
            <FormHelperText>Enter the name you would like to have.</FormHelperText>
          ) : (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </FormControl>
        <Center>
          <Avatar name={currentUser?.imageName} src={profilePhoto} size="2xl" />
        </Center>
        <FormControl mb="1rem">
          <FormLabel htmlFor="profilePhoto" fontSize="1.5rem">
            Profile photo
          </FormLabel>
          <Input
            disabled={!isEditing}
            h="4.3rem"
            size="lg"
            id="profilePhoto"
            type="file"
            onChange={(e) => handleFileSelected(e)}
            cursor="pointer"
            accept=".png, .jpg, .jpeg"
          />
          <FormHelperText>Change the profile photo.</FormHelperText>
        </FormControl>
        {isEditing ? (
          <Input
            size="lg"
            disabled={isNameError}
            type="submit"
            value="Save"
            cursor="pointer"
            borderColor="green.400"
            color="green.400"
            _hover={{
              color: 'green.600',
              borderColor: 'green.600',
            }}
          />
        ) : (
          <FormControl>
            <Input
              onClick={() => setIsEditing(true)}
              size="lg"
              type="submit"
              value="Edit"
              cursor="pointer"
            />
          </FormControl>
        )}
      </form>
    </Box>
  );
}

export default BasicInfo;
