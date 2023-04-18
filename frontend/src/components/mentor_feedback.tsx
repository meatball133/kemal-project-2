import { representerFiles } from '../App';
import { useRecoilState } from 'recoil';
import {
  Text,
  Box,
  Container,
  Badge,
  TypographyStylesProvider,
} from '@mantine/core';

export function MentorFeedback() {
  const [RepresenterFiles, _] = useRecoilState(representerFiles);
  return (
    <Container size="sm" px="xs">
      <Badge
        sx={() => ({
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
                dangerouslySetInnerHTML={{
                  __html: RepresenterFiles['mentor_note'],
                }}
                style={{ whiteSpace: 'normal',  wordBreak: "break-all"}}
              />
            </TypographyStylesProvider>
          }
        </Text>
      </Box>
    </Container>
  );
}
