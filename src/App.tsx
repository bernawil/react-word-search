import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import styled from "styled-components";
import TEST_CASES from './test_cases';
import { Cell, findSolution } from './search_utils';

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;

  @media (max-width: 500px) {
    flex-direction: column-reverse;
  }

  * > h6 {
    margin: 10px 0;
    padding: 0;
  }

  & > * > h2 {
    letter-spacing: 5px;
    text-aliglignn: center;
  }

  & > :nth-child(1) {
    height: 100%;

    @media (max-width: 500px) {
      display: flex;
      align-items: center;
      justify-content: center;
      & > * {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      }
    }
  }

  & > :nth-child(1) > * > ul {
    padding: 0;
    margin: 20px 0;
  }
`

const CaseItem = styled.li`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  list-style: none;
`

const Button = styled.button`
  cursor: pointer;
  font-family: monospace;
  style: none;
  border: 1px solid beige;
  background: none;
  color: beige;
  border-radius: 5px;
  padding: 10px;
  &:hover {
    backdrop-filter: contrast(0.5);
  }
  &:active {
    transform: translate3d(-2px, -2px, 2px);
    transition: transform 0.2s ease-in-out;
  }

`

const Board = styled.div<{ $unsolvable?: boolean }>`
  display: flex;
  flex-direction: column;
  ${props => props.$unsolvable ? '& > * > div { background: rgb(255, 50, 50); }' : ''}

`
const BoardLine = styled.div`
  display: flex;
  flex-direction: row;
`

const BoardSquare = styled.div<{ $visited?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid black;
  height: 100px;
  width: 100px;
  ${props => props.$visited ? 'background: olive;' : 'background: beige;'}
  ${props => !props.children ? 'background: none;' : ''}
  color: black;
`
const Editor = styled.textarea<{ $error?: boolean }>`
  @media (max-width: 400px) {
    min-width: 90%;
  }
  min-height: 400px;
  min-width: 300px;
  font-family: monospace;
  font-size: 0.8rem;
  background: none;
  color: white;
  ${props => props.$error ? "background: #ff00004a;" : ""}
`

function Square({ step, children, ...rest }: { step?: number; children: string[] | string; }) {
  const [visited, setVisited] = useState(false);

  useEffect(() => {
    if (step) {
      setTimeout(() => setVisited(true), step * 300);
    }
  }, [step]);

  return <BoardSquare $visited={visited} {...rest}>{children}</BoardSquare>;
}

function App() {
  const [{ board, word }, setTestCase] = useState(TEST_CASES[0])
  const [solution, setSolution] = useState<Cell[]>([])
  const [replay, setReplay] = useState<number>(0);
  const [editorInput, setEditorInput] = useState<string>(JSON.stringify(TEST_CASES[0], null, 2))
  const [inputError, setInputError] = useState<boolean>(false)

  useEffect(() => {
    setSolution(findSolution(board, word));
    setEditorInput(JSON.stringify({ board, word }, null, 2))
  }, [board, word]);

  useEffect(() => {
    try {
      const caseInput = JSON.parse(editorInput)
      setTestCase(caseInput);
      setInputError(false)
    } catch (err) {
      setInputError(true)
    }
  }, [editorInput])

  const boardRender = useMemo(() => {
    const boardLines = board.map((row, ri) => {
      const line = row.map((item, ci) => {
        const solutionStep = solution.findIndex(cell => {
          return cell.row === ri && cell.col === ci
        })
        return <Square key={`${ri}-${ci}`} step={solutionStep > -1 ? solutionStep + 1 : undefined}>{item}</Square>
      })
      return <BoardLine key={`${ri}`}>{line}</BoardLine>
    })

    const boardRender = (
      <Board $unsolvable={!solution.length} key={`board-${replay}-${word}-${board.toString()}`}>{boardLines}</Board >
    )

    return boardRender

  }, [solution, replay])


  return (
    <div className="App-header">
      <a href={'https://www.github.com/bernawil/react-word-search'}>
        <h2>
          React Word Search
        </h2>
      </a>
      <Layout>
        <div>
          <div>
            <Button onClick={() => setReplay(replay + 1)}>Replay Solution</Button>
            <ul>
              {TEST_CASES.map((_testCase, i) => <CaseItem onClick={() => setTestCase(TEST_CASES[i])}>{`Case ${i + 1}`}</CaseItem>)}
            </ul>
            <div>
              <h6>Try Editing!</h6>
              <Editor $error={inputError} value={editorInput} onChange={e => setEditorInput(e.target.value)} />
            </div>
          </div>
        </div>
        <div>
          {boardRender}
          <h2>{word}</h2>
        </div>
      </Layout>
    </div>
  )
}

export default App;