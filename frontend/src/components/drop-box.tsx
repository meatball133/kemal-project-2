import {
  Group,
  Text,
  useMantineTheme,
  rem,
  Box,
  Container,
  Flex,
  Notification,
} from '@mantine/core';
import { IconFileCode, IconX } from '@tabler/icons-react';
import { Dropzone } from '@mantine/dropzone';
import { Api } from './api';
import { useRecoilState } from 'recoil';
import { representerFiles, loadingState } from '../App';
import { useState } from 'react';

export function DropBox() {
  const [failed, setFail] = useState(false);
  const [_, setRepresenterFiles] = useRecoilState(representerFiles);
  const [loading, setLoading] = useRecoilState(loadingState);
  const theme = useMantineTheme();
  return (
    <>
      <Container size="sm" px="xs">
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
          <Dropzone
            onDrop={(files) =>
              Api(files, setRepresenterFiles, setLoading, setFail)
            }
            onReject={(files) => console.log(files)}
            maxSize={1024 * 1024 * 1}
            loading={loading}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: rem(220), pointerEvents: 'none' }}
            >
              <Dropzone.Accept>
                <IconFileCode
                  size="3.2rem"
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === 'dark' ? 4 : 6
                    ]
                  }
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  size="3.2rem"
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconFileCode size="3.2rem" stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag Crystal file here or click to select file
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  File cant be bigger than 1 mb
                </Text>
              </div>
            </Group>
          </Dropzone>
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
          title="Parsing failed"
          sx={(theme) => ({
            width: 400,
            height: 75,
            display: failed ? 'flex' : 'none',
          })}
          onClose={() => {
            setFail(false);
          }}
        >
          An error occured while parsing your file
        </Notification>
      </Flex>
    </>
  );
}
