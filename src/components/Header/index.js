import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Header = function ({ setShowModal }) {

    const handleClick = () => {
        setShowModal(true);
    }

    return (
        <Navbar expand="lg" variant="light" bg="light" fluid="true">
            <Container>
                <Navbar.Brand href="#">ToDo Calendar</Navbar.Brand>
                <Navbar.Text>
                    <Button variant="secondary" onClick={handleClick}>+Add Task</Button>
                </Navbar.Text>
            </Container>
        </Navbar>
    )

}

export default Header;