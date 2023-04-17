import { Prism } from '@mantine/prism';
import { textState } from '../App';
import { useRecoilState } from 'recoil';
import {
  Text,
  Box,
  Container,
  Badge,
  TypographyStylesProvider,
} from '@mantine/core';

export function MentorFeedback() {
  const [text, setTodoList] = useRecoilState(textState);
  return (
    <Container size="xs" px="xs">
      <Badge
        sx={(theme) => ({
          position: 'relative',
          top: 10,
          right: 10,
        })}
        size="lg"
        variant="gradient"
        gradient={{ from: 'teal', to: 'blue' }}
      >
        {<Text>Mentor Feedback</Text>}{' '}
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
        <Text>
          {
            <TypographyStylesProvider>
              <div
                dangerouslySetInnerHTML={{ __html: text['mentor_note'] }}
                style={{ whiteSpace: 'pre' }}
              />
            </TypographyStylesProvider>
          }
        </Text>
      </Box>
    </Container>
  );
}
