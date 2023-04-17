import { Prism } from '@mantine/prism';
import { textState } from '../App';
import { useRecoilState } from 'recoil';
import {
  Text,
  Box,
  Container,
  Badge,
  TextInput,
  PasswordInput,
  Space,
  Button,
  Center,
  Flex,
  Notification,
} from '@mantine/core';
import { useState } from 'react';
import { LoginInApi } from './api';
import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';

export function SignIn() {
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [failed, setFail] = useState([false, '']);
  console.log(failed);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      password: hasLength(
        { min: 6, max: 64 },
        'Name must be 6-64 characters long'
      ),
      email: isEmail('Invalid email'),
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
            LoginInApi(values['email'], values['password'], setFail);
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
            withAsterisk
            {...form.getInputProps('password')}
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
            href="./sign_up"
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
            Don't have an accont?, then sign up
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
