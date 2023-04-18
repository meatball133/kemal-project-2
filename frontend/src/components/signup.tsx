import {
  Text,
  Box,
  Container,
  TextInput,
  PasswordInput,
  Space,
  Button,
  Center,
  Flex,
  Notification,
} from '@mantine/core';
import { useState } from 'react';
import { SignUpApi } from './api';
import { useForm, isEmail, hasLength, matchesField } from '@mantine/form';
import { IconX } from '@tabler/icons-react';

export function SignUP() {
  const [failed, setFail] = useState([false, '']);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      password: hasLength(
        { min: 6, max: 64 },
        'Name must be 6-64 characters long'
      ),
      email: isEmail('Invalid email'),
      confirmPassword: matchesField('password', 'Passwords are not the same'),
    },
  });

  return (
    <>
      <Container size="xs" px="xs">
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[2],
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
          })}
          component="form"
          onSubmit={form.onSubmit((values) => {
            SignUpApi(
              values['email'],
              values['password'],
              values['confirmPassword'],
              setFail
            );
          })}
        >
          <TextInput
            placeholder="Your Email-adress"
            label="Email Adress"
            withAsterisk
            {...form.getInputProps('email')}
          />
          <Space h="md" />
          <PasswordInput
            placeholder="Password"
            label="Password"
            description="Password must include at least one letter, number and special character"
            {...form.getInputProps('password')}
            withAsterisk
          />
          <Space h="md" />
          <PasswordInput
            placeholder="Confirm Password"
            label="Confirm Password"
            description="Password must include at least one letter, number and special character"
            {...form.getInputProps('confirmPassword')}
            withAsterisk
          />
          <Space h="md" />
          <Center>
            <Button type="submit">Login In</Button>
          </Center>
          <Space h="md" />
          <Text
            display="block"
            ta="center"
            td="underline"
            component="a"
            href="./sign_in"
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[2],
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.white
                  : theme.colors.gray[6],
              padding: theme.spacing.md,
              borderRadius: theme.radius.md,
              cursor: 'pointer',

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
              },
            })}
          >
            Already have an account? then sign in
          </Text>
        </Box>
      </Container>
      <Flex
        sx={(theme) => ({
          position: 'absolute',
          bottom: 50,
          right: 50,
        })}
        direction="column"
        gap={10}
      >
        <Notification
          icon={<IconX size="1.5rem" />}
          color="red"
          title="Login failed"
          sx={(theme) => ({
            width: 400,
            height: 75,
            display: failed[0] ? 'flex' : 'none',
          })}
          onClose={() => {
            setFail([false, '']);
          }}
        >
          {failed[1]}
        </Notification>
      </Flex>
    </>
  );
}
