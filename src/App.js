import { useState } from 'react';
import { AppContext } from './utils/contextStore'

import Calendar from './components/Calendar';
import TaskList from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [date, setDate] = useState(new Date());
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todos') || '[]'));
  const [showModal, setShowModal] = useState(false);

  return (
    <AppContext.Provider value={{ date, todoList }}>
      <Header showModal={showModal} onButtonClick={setShowModal} />
      <AddTaskModal showModal={showModal} onClose={setShowModal} updateTaskList={setTodoList} />
      <Container fluid>
        <Row>
          <Col sm={8}> <Calendar setDate={setDate} setShowModal={setShowModal} /></Col>
          <Col sm={4}> <TaskList setTodoList={setTodoList} /></Col>
        </Row>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
