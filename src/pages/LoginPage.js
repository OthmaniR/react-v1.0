import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Card, Container, Row, Col } from 'react-bootstrap';
import Tables from "./SaleTable";
import { useNavigate } from 'react-router-dom';


import {
  Grid,
  
  Box,
  Stack,
  IconButton,
  Fab,
  ButtonGroup,
} from "@mui/material";
import "./Login.css";
import FeatherIcon from "feather-icons-react";
import { useRef ,  useEffect ,useContext} from "react";
import AuthContext from '../context/AuthProvider'
function LoginPage() {
  const {setAuth}=useContext(AuthContext);
  const userRef=useRef();
  const errRef =useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg , setErrMsg]=useState("");
  const [success , setSuccess] =useState(false);

  const navigate = useNavigate();
useEffect(() => {
  userRef.current.focus();
},[])

useEffect(() => {
  setErrMsg('');
},[email,password])

  const handleSubmit = async (event) => {
    console.log(email, password);
    setEmail('');
    setPassword('');
    event.preventDefault();//dont reload
    setSuccess(true);
   
    const response = await axios.post('/api/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    
  };

  return (
    <>
    {success ? (
       navigate('/')
    ):(
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <p ref={errRef} className={errMsg ? "errmsg" :"offscreen"} aria-live="assertive">{errMsg}</p>
      <Row className="justify-content-center">
        <Col lg={90}>
          <Card>
            <Card.Header>
              <center>
            <Fab color="secondary" disabled aria-label="add">
              <FeatherIcon icon="user" width="20" height="20" />
            </Fab>
            </center>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    ref={userRef}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <center>
                <Button variant="contained" color="primary" type="submit" >
             Login
            </Button>
            </center>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    )}
    </>
  );
}

export default LoginPage;
