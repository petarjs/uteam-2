import {
  Flex,
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
import React, { useState } from 'react';

import { API_URL } from 'config/config.js';
import { useAuthContext } from 'context/AuthContext.jsx';
import { createCompany } from 'services/company';

function CompanyInfo() {
  const { currentCompany, changeCompanyName, changeCompanyLogo } = useAuthContext();
  const [nameInput, setNameInput] = useState(currentCompany?.name);
  const [companyLogo, setCompanyLogo] = useState(
    currentCompany.imagePathURL ? API_URL + currentCompany.imagePathURL : ''
  );
  const [companyLogoFile, setCompanyLogoFile] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const toast = useToast();

  const handleNameChange = (e) => setNameInput(e.target.value);
  const isNameError = nameInput === '';

  const handleEditProfile = async (e) => {
    e.preventDefault();

    if (currentCompany.id) {
      await changeCompanyName(currentCompany.id, nameInput);

      if (companyLogo != API_URL + currentCompany?.imagePathURL) {
        const uploadFileData = new FormData();
        uploadFileData.append('files', companyLogoFile);

        await changeCompanyLogo(uploadFileData, currentCompany.id);
      } else {
        console.log('profilna nije promenjena', companyLogo);
      }
    } else {
      const newCompanyId = await createCompany(nameInput);
      console.log('NEW COMPANY ID??', newCompanyId);
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
        setCompanyLogo(e.target.result);
        setCompanyLogoFile(files[0]);
      };

      reader.readAsDataURL(files[0]);
    } else {
      console.log('CANCEL clicked!', companyLogo);
      setCompanyLogo(currentCompany.imagePathURL ? API_URL + currentCompany.imagePathURL : '');
    }
  };

  return (
    <Box p="1rem">
      <Heading mb="1rem">Company Info</Heading>
      <Flex>
        <Box w="100%" maxW="400px" p="2rem">
          <form onSubmit={handleEditProfile}>
            <FormControl isInvalid={isNameError} mb="1rem">
              <FormLabel htmlFor="name" fontSize="1.5rem">
                Company Name
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
                <FormHelperText>Enter the company name you would like to have.</FormHelperText>
              ) : (
                <FormErrorMessage>Company Name is required.</FormErrorMessage>
              )}
            </FormControl>
            <Center>
              <Avatar name={currentCompany?.imageName} src={companyLogo} size="2xl" />
            </Center>
            <FormControl mb="1rem">
              <FormLabel htmlFor="companyLogo" fontSize="1.5rem">
                Company Logo
              </FormLabel>
              <Input
                disabled={!isEditing}
                h="4.3rem"
                size="lg"
                id="companyLogo"
                type="file"
                onChange={(e) => handleFileSelected(e)}
                cursor="pointer"
                accept=".png, .jpg, .jpeg"
              />
              <FormHelperText>Change the company logo.</FormHelperText>
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
      </Flex>
    </Box>
  );
}

export default CompanyInfo;
