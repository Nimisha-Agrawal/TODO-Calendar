import { useContext, useState } from "react";
import { AppContext } from "../../utils/contextStore";
import { calendarDateFormatToInputDate } from "../../utils/contextStore";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../../App.css";

const AddTaskModal = ({ showModal, onClose, updateTaskList }) => {
    const { date: calendarDateCurrentlySelected, todoList } = useContext(AppContext);

    // useEffect(() => {
    //     const dateControl = document.getElementById('dateInput');
    //     dateControl.value = calendarDateFormatToInputDate(calendarDateCurrentlySelected);
    // }, [calendarDateCurrentlySelected])

    const inputDateCurrentlySelected = calendarDateFormatToInputDate(calendarDateCurrentlySelected);
    let previousTaskAddedForSelectedDate;
    const calculatePreviousTask = () => {
        if (todoList.length > 0) {
            for (let task of todoList) {
                if (task.dateAdded === inputDateCurrentlySelected) {
                    previousTaskAddedForSelectedDate = task.taskAdded;
                    break;
                }
            }
        }
    }
    calculatePreviousTask();

    const [task, setTask] = useState(previousTaskAddedForSelectedDate);


    if (!showModal) {
        return null;
    }

    const setTaskValue = (e) => {
        setTask(e.target.value);
    }

    const handleClose = () => onClose(false);

    // const setDateValue = (e) => {
    //     setInputDate(e.target.value)
    // }

    const saveValue = () => {
        const inputDate = document.querySelector('input[type="date"]').value;
        if (task && inputDate) {
            const length = todoList.length;
            const alreadyExistingTask = todoList.find(todo => todo.dateAdded === inputDate);
            if (alreadyExistingTask) {
                alreadyExistingTask.taskAdded = task;
            } else {
                todoList.push({ id: length + 1, dateAdded: inputDate, taskAdded: task });
            }
            localStorage.setItem('todos', JSON.stringify(todoList));
            updateTaskList(todoList);
            onClose(false);
        }
    }

    return (
        <Modal show={showModal} onHide={handleClose} backdrop="static"
            keyboard={false} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Enter Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            value={task}
                            onChange={setTaskValue}
                            required
                            autoFocus
                        />
                        <span class="validity" />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput2"
                    >
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control type="date" placeholder="Select Date" value={calendarDateFormatToInputDate(calendarDateCurrentlySelected)} min={calendarDateFormatToInputDate(new Date())} required />
                        <span class="validity" />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={saveValue}>Done</Button>
            </Modal.Footer>
        </Modal>
    );
    // <div class="modal" id="modal">
    //     <div id="heading" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}><h2>Add Task</h2> <button onClick={() => onClose(false)}>✕</button></div>
    //     <div class="content">{
    //         <form>
    //             <input type="text" placeholder="Enter title" value={task} onChange={setTaskValue} required /><span class="validity"></span>
    //             <br />
    //             <input id="dateInput" type="date" placeholder="Select Date" value={calendarDateFormatToInputDate(calendarDateCurrentlySelected)} min={calendarDateFormatToInputDate(new Date())} required />
    //             <span class="validity"></span>


    //     <div class="actions">
    //         <button onClick={saveValue}>
    //             Done
    //         </button>
    //     </div>
    //         </form>
    //     }</div>
    // </div>
    // )
}

export default AddTaskModal;