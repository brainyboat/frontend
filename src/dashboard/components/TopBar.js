import { PersonFill } from "react-bootstrap-icons";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function TopBar(props) {
  return (
    <Navbar className={props.className}>
      <Container fluid>
        <Navbar.Brand href="#">
          <svg
            style={{ marginBottom: "4px", marginRight: ".75rem" }}
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m269-269 292-129 129-292-292 129-129 292Zm211-171q-17 0-28.5-11.5T440-480q0-17 11.5-28.5T480-520q17 0 28.5 11.5T520-480q0 17-11.5 28.5T480-440Zm.138 385Q392-55 314.513-88.084q-77.488-33.083-135.417-91.012T88.084-314.375Q55-391.724 55-479.862 55-569 88.084-646.487q33.083-77.488 90.855-134.969 57.772-57.482 135.195-91.013Q391.557-906 479.779-906q89.221 0 166.827 33.454 77.605 33.453 135.012 90.802 57.407 57.349 90.895 134.877Q906-569.34 906-480q0 88.276-33.531 165.747-33.531 77.471-91.013 135.278-57.481 57.808-134.831 90.891Q569.276-55 480.138-55ZM480-149q138 0 234.5-96.372T811-480q0-138-96.5-234.5t-235-96.5q-137.5 0-234 96.5t-96.5 235q0 137.5 96.372 234T480-149Zm0-331Z" />
          </svg>
          BrainyBoat
        </Navbar.Brand>

        <Nav className="ms-auto">
          <NavDropdown
            title={
              <>
                <PersonFill size={24} className="me-1" />
              </>
            }
            id="basic-nav-dropdown"
            align="end"
          >
            <NavDropdown.Header>Учетная запись: admin</NavDropdown.Header>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.1">
              Личный кабинет
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Настройки</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Выйти</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
