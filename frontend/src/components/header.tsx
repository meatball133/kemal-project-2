import {
  AppShell,
  Text,
  Header,
  Container,
  Group,
  ActionIcon,
  useMantineColorScheme,
  Flex,
  Button,
  Burger,
  createStyles,
  Transition,
  Paper,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      border: 'none',
      height: 50,
      width: '100%',
      padding: theme.spacing.md,
    },
  },
}));

export function Header2() {
  const [token, setoken] = useLocalStorage({
    key: 'Key',
    defaultValue: '',
    getInitialValueInEffect: true,
  });
  console.log(token);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? 'Close navigation' : 'Open navigation';
  const { classes, cx } = useStyles();
  const links = [
    ['Home', '/'],
    ['Representer', '/representer'],
    ['Mentoring', '/cards', 'true'],
  ];
  const items = links.map((link) => (
    <Button
      radius="md"
      variant="outline"
      className={classes.link}
      key={link[0]}
      component="a"
      href={link[1]}
      sx={(theme) => ({
        display: link[2] === 'true' && !token ? 'none' : 'block',
      })}
    >
      <Text>{link[0]}</Text>
    </Button>
  ));

  return (
    <Header height={60} p="xs">
      <Container>
        <Flex
          direction={{ base: 'row-reverse', sm: 'row' }}
          justify="center"
          sx={(theme) => ({
            width: '100%',
            height: '100%',
          })}
        >
          <Flex
            justify={{ base: 'flex-end', sm: 'center' }}
            align="center"
            sx={(theme) => ({
              width: '100%',
            })}
            gap="xl"
          >
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="sm"
            />
            <Transition
              transition="pop-top-right"
              duration={200}
              mounted={opened}
            >
              {(styles) => (
                <Paper className={classes.dropdown} withBorder style={styles}>
                  {items}
                </Paper>
              )}
            </Transition>
            <Group className={classes.links}>{items}</Group>
          </Flex>
          <Flex
            justify="flex-end"
            align="center"
            gap="lg"
            direction={{ base: 'row-reverse', sm: 'row' }}
          >
           <Button
              radius="md"
              color="red"
              onClick={() => {setoken("");
              window.location.reload();}}
              sx={(theme) => ({
                display: token ? 'block' : 'none',
              })}
            >
              Logout
              </Button>
            <Button
              radius="md"
              variant="outline"
              component="a"
              href="/sign_in"
              sx={(theme) => ({
                display: token ? 'none' : 'block',
              })}
            >
              <Text>Sign in</Text>
            </Button>
            <Button
              radius="md"
              variant="filled"
              component="a"
              href="sign_up"
              sx={(theme) => ({
                display: token ? 'none' : 'block',
              })}
            >
              <Text>Sign up</Text>
            </Button>
            <Group position="center">
              <ActionIcon
                onClick={() => toggleColorScheme()}
                size="lg"
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.yellow[4]
                      : theme.colors.blue[6],
                })}
              >
                {colorScheme === 'dark' ? (
                  <IconSun size="1.2rem" />
                ) : (
                  <IconMoonStars size="1.2rem" />
                )}
              </ActionIcon>
            </Group>
          </Flex>
        </Flex>
      </Container>
    </Header>
  );
}
