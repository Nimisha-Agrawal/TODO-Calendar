import { useContext } from "react";
import { AppContext } from "../../utils/contextStore";
import Card from 'react-bootstrap/Card';

import { calendarDateFormatToInputDate } from "../../utils/contextStore";


const TaskList = ({ setTodoList }) => {
    let { date, todoList } = useContext(AppContext);
    const currentSelectedDate = calendarDateFormatToInputDate(date);
    const dateParts = currentSelectedDate.split('-');
    dateParts[2] = '01';
    const firstDateOfCurrentMonth = dateParts.join('-');
    dateParts[2] = '31';
    const lastPossibleDateOfCurrentMonth = dateParts.join('-');

    todoList = todoList?.sort((a, b) => a.dateAdded - b.dateAdded).filter(todo => (todo.dateAdded >= firstDateOfCurrentMonth && todo.dateAdded <= lastPossibleDateOfCurrentMonth));



    const removeTodo = (idx) => {
        todoList.splice(idx, 1);
        localStorage.setItem('todos', JSON.stringify(todoList));
        setTodoList(todoList);
    }

    return (
        <>
            {todoList && todoList.map((todo, index) => (
                <Card
                    style={{ width: '18rem' }}
                    className="mb-2"
                >
                    <Card.Header as="div">Task <button style={{ padding: '2px', borderRadius: '100%', color: 'white', backgroundColor: 'red' }} onClick={() => removeTodo(index)}>✕</button></Card.Header>
                    <Card.Body>
                        <Card.Title>{todo.dateAdded}</Card.Title>
                        <Card.Text>
                            {todo.taskAdded}
                        </Card.Text>
                    </Card.Body>
                </Card>
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
