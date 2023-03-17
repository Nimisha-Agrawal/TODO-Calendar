import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Header = function ({ showModal, onButtonClick }) {
    if (showModal) {
        return null;
    }
    const handleClick = () => {
        onButtonClick(true);
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