import { useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

import Calendar from './components/Calendar';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import Header from './components/Header';

import useWindowSize from './customHooks/useWindowSize';
import { AppContext } from './utils/contextStore'
import * as constants from './constants';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [date, setDate] = useState(new Date());
  const currentDate = new Date();
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todos') || '[]'));
  const [showModal, setShowModal] = useState(false);
  const size = useWindowSize();

  return (
    <AppContext.Provider value={{ date, todoList, currentDate }}>
      <Stack gap={4}>
        <Header showModal={showModal} onButtonClick={setShowModal} />
        <AddTaskModal showModal={showModal} onClose={setShowModal} setTodoList={setTodoList} setDate={setDate} />
        <Container fluid>
          <Row>
            <Stack direction={size.width >= constants.mediumBreakpoint ? 'horizontal' : ''} gap={3}>
              <Col xs={100}> <Calendar setDate={setDate} setShowModal={setShowModal} /></Col>
              <Col> <TaskList setTodoList={setTodoList} /></Col>
            </Stack>
          </Row>
        </Container>
      </Stack>
    </AppContext.Provider>
  );
}

export default App;
