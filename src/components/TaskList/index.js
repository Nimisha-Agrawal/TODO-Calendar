import { useContext } from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';

import { AppContext } from "../../utils/contextStore";
import { updatedTaskList } from "../../utils/contextStore";

const TaskList = ({ setTodoList }) => {
    let { date, todoList } = useContext(AppContext);

    todoList = updatedTaskList(date, todoList);

    const removeTodo = (idx) => {
        todoList.splice(idx, 1);
        localStorage.setItem('todos', JSON.stringify(todoList));
        setTodoList(todoList);
    }

    return (
        <>
            {todoList && todoList.map((todo, index) => (
                <Col>
                    <Card
                        key={todo.id}
                        style={{ width: 'auto' }}
                        className="mb-2"
                    >
                        <Card.Header as="div"> <CloseButton aria-label="Hide" onClick={() => removeTodo(index)} /></Card.Header>
                        <Card.Body>
                            <Card.Title>{todo.dateAdded}</Card.Title>
                            <Card.Text>
                                {todo.taskAdded}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </>
    );
}

export default TaskList;
