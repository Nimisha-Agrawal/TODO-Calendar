import { useState, useEffect, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { AppContext, calendarDateFormatToInputDate } from "../../utils/contextStore";

const AddTaskModal = ({ showModal, onClose, setTodoList, setDate }) => {
    const { date: calendarDateCurrentlySelected, todoList, currentDate } = useContext(AppContext);
    const [validated, setValidated] = useState(false);
    
    const inputDateCurrentlySelected = calendarDateCurrentlySelected && calendarDateFormatToInputDate(calendarDateCurrentlySelected);
    const minInputDateValue = calendarDateFormatToInputDate(currentDate);
    let previousTaskAddedForSelectedDate;

    const calculatePreviousTask = () => {
        if (todoList.length > 0) {
            for (let task of todoList) {
                if (task.dateAdded === inputDateCurrentlySelected) {
                    previousTaskAddedForSelectedDate = task.taskAdded;
                    break;
                } else {
                    previousTaskAddedForSelectedDate = ''
                }
            }
        }
    }

    useEffect(() => {
        calculatePreviousTask();
        setTask(previousTaskAddedForSelectedDate);
    }, [showModal])

    const [task, setTask] = useState(previousTaskAddedForSelectedDate);

    if (!showModal) {
        return null;
    }

    const handleTaskChange = (e) => {
        setTask(e.target.value);
    }

    const handleInputDateChange = (e) => {
        if (e.target.value <= minInputDateValue) {
            setDate(currentDate);
        } else {
            setDate(new Date(e.target.value));
        }
    }

    const handleClose = () => onClose(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        saveValue();
    }

    const saveValue = () => {
        if (task && inputDateCurrentlySelected) {
            const length = todoList.length;
            const alreadyExistingTask = todoList.find(todo => todo.dateAdded === inputDateCurrentlySelected);
            if (alreadyExistingTask) {
                alreadyExistingTask.taskAdded = task;
            } else {
                todoList.push({ id: length + 1, dateAdded: inputDateCurrentlySelected, taskAdded: task });
            }
            localStorage.setItem('todos', JSON.stringify(todoList));
            setValidated(false);
            setTodoList(todoList);
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
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="taskControl">
                        <Form.Label>Enter Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Title"
                            value={task}
                            onChange={handleTaskChange}
                            required
                            autoFocus
                        />
                        <Form.Control.Feedback type="invalid">Please enter the title</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="dateControl"
                    >
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control onChange={handleInputDateChange} type="date" placeholder="Select Date" value={inputDateCurrentlySelected} min={minInputDateValue} required />
                        <Form.Text className="text-muted">
                            You can't add tasks for past dates from now
                        </Form.Text>
                    </Form.Group>
                    <Button variant="secondary" type="submit">Done</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddTaskModal