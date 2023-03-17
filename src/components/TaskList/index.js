import { useContext } from "react";
import { AppContext } from "../../utils/contextStore";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';

import { calendarDateFormatToInputDate } from "../../utils/contextStore";


const TaskList = ({ setTodoList }) => {
    let { date, todoList } = useContext(AppContext);
    if(date){
    const currentSelectedDate = calendarDateFormatToInputDate(date);
    const dateParts = currentSelectedDate.split('-');
    dateParts[2] = '01';
    const firstDateOfCurrentMonth = dateParts.join('-');
    dateParts[2] = '31';
    const lastPossibleDateOfCurrentMonth = dateParts.join('-');
    todoList = todoList?.sort((a, b) => Number(a.dateAdded.split('-')[2]) - Number(b.dateAdded.split('-')[2])).filter(todo => (todo.dateAdded >= firstDateOfCurrentMonth && todo.dateAdded <= lastPossibleDateOfCurrentMonth));
    }



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
        // <div>
        //     {todoList && todoList.map((todo, index) => (
        //         <div>
        //             <div>{todo.dateAdded}</div>
        //             <div>{todo.taskAdded}</div>
        //             <span>
        //                 <button style={{ padding: '2px', borderRadius: '100%', color: 'white', backgroundColor: 'red' }} onClick={() => removeTodo(index)}>✕</button>
        //             </span>
        //         </div>
        //     ))}
        // </div>
    );

}

export default TaskList;
