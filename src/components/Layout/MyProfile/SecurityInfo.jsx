import { Heading, Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuthContext } from 'context/AuthContext.jsx';

function SecurityInfo() {
  const { currentUser, changePassword } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line no-unused-vars
    reset,
    trigger,
    watch,
  } = useForm();

  const watchPassword = watch('password', false);

  const handleEditProfile = async (data) => {
    await changePassword(currentUser.id, data.password);

    setIsEditing(false);
  };

  return (
    <Box w={{ base: '100%', smmd: '50%' }} maxW="700px" p="2rem">
      <Heading as="h3" size="md" mb="1rem">
        Security Info:
      </Heading>
      <form onSubmit={handleSubmit((data) => handleEditProfile(data))}>
        <FormControl mb="1rem">
          <FormLabel htmlFor="email" fontSize="1.5rem">
            Email
          </FormLabel>
          <Input
            size="lg"
            type="email"
            id="email"
            value={currentUser.email}
            readOnly={true}
            {...register('email', {
              required: 'Email is required',
            })}
          />
        </FormControl>
        <FormControl mb="1rem">
          <FormLabel htmlFor="password" fontSize="1.5rem">
            New Password
          </FormLabel>
          <Input
            disabled={!isEditing}
            size="lg"
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Your password must be at least 6 characters long',
              },
              maxLength: {
                value: 15,
                message: 'Your password must not be longer than 15 characters',
              },
            })}
            onKeyUp={() => {
              trigger('password');
            }}
          />
          {errors.password && <p className="register__error-message">{errors.password.message}</p>}
        </FormControl>

        <FormControl mb="1rem">
          <FormLabel htmlFor="confirmPassword" fontSize="1.5rem">
            Confirm New Password
          </FormLabel>
          <Input
            disabled={!isEditing}
            size="lg"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) => value === watchPassword,
            })}
            onKeyUp={() => {
              trigger('confirmPassword');
            }}
          />
          {errors.confirmPassword && errors.confirmPassword.type === 'validate' && (
            <p className="register__error-message">Passwords do not match!</p>
          )}
        </FormControl>

        {isEditing ? (
          <Input
            size="lg"
            disabled={errors.password || errors.confirmPassword || errors.email}
            type="submit"
            value="Save"
            cursor="pointer"
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

export default SecurityInfo;
