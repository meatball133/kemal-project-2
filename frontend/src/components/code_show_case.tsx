import { Prism } from '@mantine/prism';
import { textState } from '../App';
import { useRecoilState } from 'recoil';
import { Text, Box, Container, Badge, ColorScheme } from '@mantine/core';
import hljs from 'highlight.js/lib/core';
import crystal from 'highlight.js/lib/languages/crystal';
import '../github.css';
import '../github-dark-dimmed.css';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
hljs.registerLanguage('crystal', crystal);

export function CodeShowCase() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const [text, setTodoList] = useRecoilState(textState);
  console.log('color', colorScheme);
  hljs.configure({
    classPrefix: `${colorScheme === 'dark' ? 'dark ' : ''}hljs-`,
  });
  let value = hljs.highlight(text['solution'], { language: 'crystal' }).value;
  console.log(value);
  return (
    <>
      <Container size="xs" px="xs">
        <Badge
          sx={(theme) => ({
            position: 'relative',
            top: 10,
            right: 10,
          })}
          size="lg"
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
        >
          {`occurrence: ${text['occurrence']}`}{' '}
        </Badge>
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
          <div
            dangerouslySetInnerHTML={{ __html: value }}
            style={{ whiteSpace: 'pre' }}
          />
        </Box>
      </Container>
    </>
  );
}
