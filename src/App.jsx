import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import "../src/App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const storedList = localStorage.getItem("todoList");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const updateInput = (value) => {
    setUserInput(value);
  };

  const addItem = () => {
    const trimmedInput = userInput.trim();
    if (trimmedInput !== "") {
      const newItem = {
        id: Date.now(),
        value: trimmedInput,
      };
      setList((prevList) => [...prevList, newItem]);
      setUserInput("");
    }
  };

  const deleteItem = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const editedValue = prompt("Edit the todo:");
    if (editedValue !== null && editedValue.trim() !== "") {
      setList((prevList) =>
        prevList.map((item) =>
          item.id === id ? { ...item, value: editedValue.trim() } : item
        )
      );
    }
  };

  return (
    <Container>
      <Row className="title"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
       Let's do our TASKS!
      </Row>

      <hr />
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="add item . . . "
              size="lg"
              value={userInput}
              onChange={(e) => updateInput(e.target.value)}
              aria-label="add something"
              onKeyDown={(e) => {
                if (e.key === "Enter") addItem();
              }}
            />
            <InputGroup>
              <Button variant="dark" className="mt-2 me-2" onClick={addItem}>
                ADD
              </Button>
              <Button
                variant="danger"
                className="mt-2"
                onClick={() => setList([])}
                disabled={list.length === 0}
                title={list.length === 0 ? "No tasks to clear" : "Clear all tasks"}
              >
                Clear All
              </Button>
            </InputGroup>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <ListGroup>
            {list.map((item) => (
              <ListGroup.Item
                key={item.id}
                variant="dark"
                action
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {item.value}
                <span>
                  <Button
                    style={{ marginRight: "10px" }}
                    variant="light"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </Button>
                  <Button variant="light" onClick={() => editItem(item.id)}>
                    Edit
                  </Button>
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default App;