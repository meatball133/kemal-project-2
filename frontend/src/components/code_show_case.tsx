import { representerFiles } from '../App';
import { useRecoilState } from 'recoil';
import { Box, Container, Badge, ColorScheme, ScrollArea } from '@mantine/core';
import hljs from 'highlight.js/lib/core';
import crystal from 'highlight.js/lib/languages/crystal';
import '../github.css';
import '../github-dark-dimmed.css';
import { useLocalStorage } from '@mantine/hooks';

export function CodeShowCase() {
  const [colorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const [text] = useRecoilState(representerFiles);
  hljs.registerLanguage('crystal', crystal);
  hljs.configure({
    classPrefix: `${colorScheme === 'dark' ? 'dark ' : ''}hljs-`,
  });
  let value = hljs.highlight(text['solution'], { language: 'crystal' }).value;
  return (
    <>
      <Container size="sm" px="xs">
        <Badge
          sx={() => ({
            position: 'relative',
            top: 10,
            right: 10,
            zIndex: 1
          })}
          size="lg"
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
        >
          {`occurrence: ${text['occurrence']}`}
        </Badge>
        <ScrollArea>
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[2],
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            overflow: "hidden"
          })}
        >
          <div
            dangerouslySetInnerHTML={{ __html: value }}
            style={{ whiteSpace: 'pre' }}
          />
        </Box>
        </ScrollArea>
      </Container>
    </>
  );
}
