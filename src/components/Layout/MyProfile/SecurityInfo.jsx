import { Heading, Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useAuthContext } from 'context/AuthContext.jsx';

function SecurityInfo() {
  const { currentUser, changePassword, isCurrentPasswordCorrect } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);
  const [correctCurrentPassword, setCorrectCurrentPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line no-unused-vars
    resetField,
    trigger,
    watch,
  } = useForm();

  const watchPassword = watch('newPassword', false);

  const handleEditProfile = async (data) => {
    const currentPasswordCorrect = await isCurrentPasswordCorrect(data.password, currentUser.email);
    if (currentPasswordCorrect) {
      changePassword(currentUser.id, data.newPassword);
      resetField('password');
      resetField('newPassword');
      resetField('confirmPassword');
    } else {
      setCorrectCurrentPassword(false);
      trigger('password');
    }

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
            Current Password
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
                message: 'Your password is at least 6 characters long',
              },
              maxLength: {
                value: 15,
                message: 'Your password is not longer than 15 characters',
              },
            })}
            onKeyUp={() => {
              trigger('password');
              setCorrectCurrentPassword(true);
            }}
          />
          {errors.password && <p className="register__error-message">{errors.password.message}</p>}
          {!correctCurrentPassword && (
            <p className="register__error-message">You entered wrong current password!</p>
          )}
        </FormControl>
        <FormControl mb="1rem">
          <FormLabel htmlFor="newPassword" fontSize="1.5rem">
            New Password
          </FormLabel>
          <Input
            disabled={!isEditing}
            size="lg"
            type="password"
            id="newPassword"
            placeholder="New Password"
            {...register('newPassword', {
              required: 'New Password is required',
              minLength: {
                value: 6,
                message: 'Your New Password must be at least 6 characters long',
              },
              maxLength: {
                value: 15,
                message: 'Your New Password must not be longer than 15 characters',
              },
            })}
            onKeyUp={() => {
              trigger(['newPassword', 'confirmPassword']);
            }}
          />
          {errors.newPassword && (
            <p className="register__error-message">{errors.newPassword.message}</p>
          )}
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
            placeholder="Confirm New Password"
            {...register('confirmPassword', {
              required: 'Confirm New Password is required',
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
