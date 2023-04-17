import {
  Flex,
  Container,
  Title,
  createStyles,
  Text,
  List,
  Image,
  ThemeIcon,
  Space,
  Button,
  Center,
  Divider,
  rem,
  Card,
  SimpleGrid
} from '@mantine/core';
import {
  IconCheck,
  IconBallpen,
  IconGauge,
  IconFreeRights,
} from '@tabler/icons-react';
import { useViewportSize } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  highlight: {
    background: 'linear-gradient(to right, rgb(252, 72, 72), rgb(255, 157, 0))',
    backgroundClip: 'text',
    color: 'transparent',
  },
  img: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  line: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.lg,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  lineCard: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(60),
      height: rem(2),
      marginTop: theme.spacing.md,
    },
  },
  card: {
    height: "100%"
  }
}));

export function Home() {
    const { height, width } = useViewportSize();
  const { classes, theme } = useStyles();
  return (
    <Container size="lg">
      <Flex>
        <Container >
          <Title>
            <span className={classes.highlight}>Next Generation</span> Education
            Tools
          </Title>
          <Space h="sm" />
          <Text color="dimmed">
            Learn Crystal with feedback given to a magentude of people.
          </Text>
          <Space h="sm" />
          <List
            icon={
              <ThemeIcon color="blue" size={24} radius="xl">
                <IconCheck size="1rem" />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Crystal based</b> - Giving speed and reliability and ensure
              high quallity analysis
            </List.Item>
            <List.Item>
              <b>Analsys made by experts</b> - We have a team of experts who
              review solutions to ensure high quality
            </List.Item>
            <List.Item>
              <b>Free</b> - We believe in free education and we want to make it
              as easy as possible to access high quallity education material
            </List.Item>
          </List>
          <Space h="xl" />
          <Center>
            <Button radius="xl" size="md" component="a" href="/representer">
              Get started
            </Button>
          </Center>
        </Container>
        <Container className={classes.img}>
          <Image
            radius="md"
            src="./education.jpg"
            alt="Education"
            width={530}
          />
        </Container>
      </Flex>
      <Space h="xl" />
      <Title order={2} align="center">
        Education meant to last
      </Title>
      <Space h="sm" />
      <Text align="center" color="dimmed" className={classes.line}>
        We believe in free education and we want to make it as easy as possible
        to access high quallity education material
      </Text>
      <Space h="xl" />
      <SimpleGrid cols={width <= 770 ? 1: 3}>
        <Container size="25rem">
          <Card radius="lg" className={classes.card}>
            <IconBallpen
              color={theme.fn.primaryColor()}
              size={rem(50)}
              stroke={2}
            />
            <Title order={3} size="h4" fw={500} className={classes.lineCard}>
              Back to basic
            </Title>
            <Text>
              We went back to the basics and made sure that the learning curve
              is as low as possible
            </Text>
          </Card>
        </Container>
        <Container size="25rem">
          <Card radius="lg" className={classes.card}>
            <IconGauge
              color={theme.fn.primaryColor()}
              size={rem(50)}
              stroke={2}
            />
            <Title order={3} size="h4" fw={500} className={classes.lineCard}>
              Preformace
            </Title>
            <Text>
              Powerd by the latest technology, we ensure that the analysis is as
              fast as possible, so you can focus on learning
            </Text>
          </Card>
        </Container>
        <Container size="25rem" >
          <Card radius="lg" className={classes.card}>
            <IconFreeRights
              color={theme.fn.primaryColor()}
              size={rem(50)}
              stroke={2}
            />
            <Title order={3} size="h4" fw={500} className={classes.lineCard}>
              Free
            </Title>
            <Text>
              We belive in free education and we want to stay true to that
              belief, and bring education to everyone
            </Text>
          </Card>
        </Container>
      </SimpleGrid>
    </Container>
  );
}
