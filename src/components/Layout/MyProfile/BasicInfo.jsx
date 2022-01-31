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
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { API_URL } from 'config/config.js';
import { useAuthContext } from 'context/AuthContext.jsx';

function BasicInfo() {
  const { currentUser, changeUsername, changeUserPhoto } = useAuthContext();
  const [nameInput, setNameInput] = useState(currentUser?.username);
  const [profilePhoto, setProfilePhoto] = useState(API_URL + currentUser?.imagePathURL);
  const [profilePhotoFile, setProfilePhotoFile] = useState();
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (e) => setNameInput(e.target.value);
  const isNameError = nameInput === '';

  const handleEditProfile = async (e) => {
    e.preventDefault();

    await changeUsername(currentUser.id, nameInput);

    if (profilePhoto != API_URL + currentUser?.imagePathURL) {
      const uploadFileData = new FormData();
      uploadFileData.append('files', profilePhotoFile);

      await changeUserPhoto(uploadFileData, currentUser.id);
    } else {
      console.log('profilna nije promenjena', profilePhoto);
    }

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
      setProfilePhoto(API_URL + currentUser?.imagePathURL);
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
          <Input size="lg" disabled={isNameError} type="submit" value="Save" cursor="pointer" />
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
