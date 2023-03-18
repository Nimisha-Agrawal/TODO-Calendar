import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './components/Header';
import AddTaskModal from './components/AddTaskModal';
import Calendar from './components/Calendar';
import TaskList from './components/TaskList';

import useWindowSize from './customHooks/useWindowSize';
import { AppContext } from './utils/contextStore'
import * as constants from './constants';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todos') || '[]'));
  const [showModal, setShowModal] = useState(false);
  const size = useWindowSize();
  
  const currentDate = new Date();

  return (
    <AppContext.Provider value={{ date, todoList, currentDate }}>
      <Stack gap={4}>
        <Header showModal={showModal} setShowModal={setShowModal} />
        <AddTaskModal showModal={showModal} onClose={setShowModal} setTodoList={setTodoList} setDate={setDate} />
        <Container fluid>
          <Row>
            <Stack direction={size.width >= constants.mediumBreakpoint ? 'horizontal' : ''} gap={3}>
              <Col md={50}> <Calendar setDate={setDate} setShowModal={setShowModal} /></Col>
              <Col md={'auto'}> <TaskList setTodoList={setTodoList} /></Col>
            </Stack>
          </Row>
        </Container>
      </Stack>
    </AppContext.Provider>
  );
}

export default App;
