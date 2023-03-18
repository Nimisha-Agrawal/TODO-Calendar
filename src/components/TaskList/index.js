import { useContext } from "react";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';

import { AppContext, getSortedTodoListForCurrentMonth } from "../../utils/contextStore";

const TaskList = ({ setTodoList }) => {
    let { date, todoList } = useContext(AppContext);

    const copiedTodoList = todoList.slice(0);
    const todoListToMap = getSortedTodoListForCurrentMonth(date, copiedTodoList);
    
    const removeTodo = (idx) => {
        copiedTodoList.splice(idx, 1);
        localStorage.setItem('todos', JSON.stringify(copiedTodoList));
        setTodoList(copiedTodoList);
    }

    return (
        <>
            {todoListToMap && todoListToMap.map((todo, index) => (
                <Card
                    key={todo.id}
                    style={{ width: 'auto' }}
                    className="mb-2"
                >
                    <Card.Header as="div"> <CloseButton aria-label="Hide" onClick={() => removeTodo(index)} /></Card.Header>
                    <Card.Body>
                        <Card.Title>{new Date(todo.dateAdded).toDateString()}</Card.Title>
                        <Card.Text>
                            {todo.taskAdded}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}

export default TaskList;
