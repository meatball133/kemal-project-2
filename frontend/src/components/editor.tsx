import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import {
  Text,
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
} from '@mantine/core';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { CodeShowCase } from './code_show_case';
import { useParams } from 'react-router-dom';
import { GetSolution, UpdateApi } from './api';
import { textState } from '../App';
import { useRecoilState } from 'recoil';

interface FormValues {
  content: string;
}

export function Editor() {
  const { id } = useParams();
  const [text, setTodoList] = useRecoilState(textState);
  const [failed, setFail] = useState(false);
  const [content, onchange] = useState('<p><p>');
  const [succsesfull, setSuccsesfull] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onchange(html);
    },
  });
  useEffect(() => {
    GetSolution(setTodoList, id, onchange);
    editor?.commands.setContent(content);
  }, [content]);
  console.log(text);
  return (
    <>
      <CodeShowCase />
      <Space h="md" />
      <Container>
        <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content />
        </RichTextEditor>
      </Container>
      <Space h="md" />
      <Center>
        <Button
          size="lg"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          onClick={(event) =>
            UpdateApi(editor?.getHTML(), id, setFail, setSuccsesfull)
          }
        >
          Update
        </Button>
      </Center>
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
          icon={<IconCheck size="1.5rem" />}
          color="teal"
          title="Update succsesfull"
          sx={(theme) => ({
            width: 400,
            height: 75,
            display: succsesfull ? 'flex' : 'none',
          })}
          onClose={() => {
            setSuccsesfull(false);
          }}
        ></Notification>

        <Notification
          icon={<IconX size="1.5rem" />}
          color="red"
          title="Update failed"
          sx={(theme) => ({
            width: 400,
            height: 75,
            display: failed ? 'flex' : 'none',
          })}
          onClose={() => {
            setFail(false);
          }}
        ></Notification>
      </Flex>
    </>
  );
}
