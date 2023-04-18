import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DropBox } from './components/drop-box';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { CodeShowCase } from './components/code_show_case';
import {
  AppShell,
  Navbar,
  Space,
  Header,
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
} from '@mantine/core';
import { Header2 } from './components/header';
import { useEffect, useState } from 'react';
import { MentorFeedback } from './components/mentor_feedback';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from './components/signin';
import { SignUP } from './components/signup';
import { Cards } from './components/cards';
import { Editor } from './components/editor';
import { getCookie, setCookie } from 'cookies-next';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { Home } from './components/home';

export interface RepresenterFiles {
  solution: string;
  occurrence: number;
  mentor_note: string;
}

export const representerFiles = atom({
  key: 'representerFiles', // unique ID (with respect to other atoms/selectors)
  default: { solution: '', occurrence: 0, mentor_note: '' } as RepresenterFiles, // default value (aka initial value)
});

export const loadingState = atom({
  key: 'loadingState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

function App() {
  const [link, setLink] = useState('highlight.js/styles/github.css');
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setLink(
      link === 'highlight.js/styles/github.css'
        ? 'styles/github-dark-dimmed.css'
        : 'styles/github.css'
    );
    // when color scheme is updated save it to cookie
    localStorage.setItem('colorscheme', nextColorScheme);
  };
  return (
    <>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <AppShell
            padding="md"
            header={<Header2></Header2>}
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
          >
            <RecoilRoot>
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/representer"
                    element={
                      <>
                        <DropBox />
                        <Space h="md" />
                        <CodeShowCase />
                        <Space h="md" />
                        <MentorFeedback />{' '}
                      </>
                    }
                  />
                  <Route path="/" element={<Home />} />
                  <Route path="/sign_in" element={<SignIn />} />
                  <Route path="/sign_up" element={<SignUP />} />
                  <Route path="/cards" element={<Cards />} />
                  <Route path="/editor/:id" element={<Editor />} />
                </Routes>
              </BrowserRouter>
            </RecoilRoot>
          </AppShell>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default App;
