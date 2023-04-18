import {
  Box,
  Container,
  Badge,
  Flex,
  Card,
  Group,
  Center,
  Button,
  useMantineColorScheme,
  Space,
  createStyles,
  Pagination,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { GetSolutions, CountApi } from './api';
import hljs from 'highlight.js/lib/core';
import crystal from 'highlight.js/lib/languages/crystal';
import '../github.css';
import '../github-dark-dimmed.css';

const useStyles = createStyles((theme) => ({
  card: {
    height: '100%',
    width: 450,
  },
}));

export function Cards() {
  const { classes } = useStyles();
  const [value, setValue] = useState(Array<Array<string | number>>);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const { colorScheme } = useMantineColorScheme();
  hljs.registerLanguage('crystal', crystal);
  hljs.configure({
    classPrefix: `${colorScheme === 'dark' ? 'dark ' : ''}hljs-`,
  });
  let i = 0;

  const result = value.map((item) => {
    let text = '';
    let time = '';
    if (typeof item[0] === 'string') {
      text = hljs.highlight(item[0].split('\n').slice(0, 5).join('\n'), {
        language: 'crystal',
      }).value;
    }
    if (typeof item[3] === 'string') {
      time = item[3].slice(0, 10);
    }
    i++;
    return (
      <Card
        key={i}
        shadow="xl"
        padding="lg"
        radius="lg"
        withBorder
        className={classes.card}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.colors.white,
        })}
      >
        <Card.Section>
          <Center>
            <Box
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[3],
                padding: theme.spacing.xl,
                margin: theme.spacing.md,
                borderRadius: theme.radius.md,
                width: 400,
                overflow: "hidden"
              })}
            >
              <div
                dangerouslySetInnerHTML={{ __html: text }}
                style={{ whiteSpace: 'pre' }}
              />
            </Box>
          </Center>
        </Card.Section>
        <Group position="center">
          <Badge
            size="lg"
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime' }}
          >
            {`occurrence: ${item[1]}`}{' '}
          </Badge>
          <Badge
            size="lg"
            variant="gradient"
            gradient={{ from: '#ed6ea0', to: '#ec8c69' }}
          >
            {`Last occurrence: ${time}`}{' '}
          </Badge>
        </Group>
        <Space h="sx" />
        <Button
          variant={colorScheme === 'dark' ? 'light' : 'filled'}
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          component="a"
          href={`./editor/${item[4]}`}
        >
          Edit Feedback
        </Button>
      </Card>
    );
  });
  useEffect(() => {
    CountApi(setCount);
    GetSolutions(setValue, 1);
  }, []);
  return (
    <>
      <Container size="95rem">
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[2],
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
          })}
        >
          <Flex justify="center" align="center" wrap="wrap" gap={20}>
            {result}
          </Flex>
        </Box>
      </Container>
      <Space h="xl" />
      <Center>
        <Pagination
          total={Math.ceil(count / 12)}
          radius="md"
          size="lg"
          value={page}
          onChange={(event) => {
            setPage(event);
            GetSolutions(setValue, event);
          }}
        />
      </Center>
    </>
  );
}
