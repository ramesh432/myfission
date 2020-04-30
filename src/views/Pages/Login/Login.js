import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    // this.LoginButton = this.LoginButton.bind(this);
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    } else {
      loggedIn = true;
    }
    this.state = {
      username_state: "",
      password_state: "",
      invalid_user_pwd_state: '',
      loggedIn
    }
    this.LoginButton = this.LoginButton.bind(this);
    this.UserName = this.UserName.bind(this);
    this.Password = this.Password.bind(this);
  }
  UserName(e) {
    this.setState({
      username_state: e.target.value
    })
  }
  Password(e) {
    this.setState({
      password_state: e.target.value
    })
    console.log("password_state...:", this.state.password_state)
  }
  LoginButton(e) {
    const self = this;
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://69.55.49.121:3001/v1/user/login',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        emailId: this.state.username_state,
        password: this.state.password_state
      }
    }).then(function (res) {
      console.log("login....:", res)
      localStorage.setItem('token', res.data.result.access_token);
      localStorage.setItem('roleId', res.data.result.roleId);
      self.state = {
        loggedIn: true
      }
      self.props.history.push('/DefaultLayout')
    }).catch(function (err) {
      self.setState({
        invalid_user_pwd_state: "Invalid username/password"
      })
      console.log("Invalid username/password");
    });
  }
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/DefaultLayout" />
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1 className="sigh">Login</h1>
                      {/* <p className="text-muted">Sign In to your account</p> */}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" onChange={this.UserName} value={this.state.username_state} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" onChange={this.Password} value={this.state.password_state} />
                      </InputGroup>
                      <p style={{ color: "red" }} >{this.state.invalid_user_pwd_state}</p>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.LoginButton.bind(this)}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Login;

