import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import axios from 'axios';
class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_data: {},
      edit_state: false,
      first_name: "",
      last_name: "",
      user_name: "",
      email_id: "",
      phone_number: "",
      website_name: "",
      first_name_create: "",
      last_name_create: "",
      user_name_create: "",
      email_id_create: "",
      phone_number_create: "",
      website_name_create: "",
      password_create: "",
      _id: "",
      client_data: "",
      add_client: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount() {
    var self = this;
    axios({
      method: 'POST',
      url: 'http://69.55.49.121:3001/v1/user/get-client-details',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      data: {
        "page": 1,
        "perpage": 10,
        "filters": {
          "search": "",
        }
      }
    }).then(function (res) {
      self.setState({
        client_data: res.data.result,
        first_name: res.data.result.firstName,
        last_name: res.data.result.lastName,
        user_name: res.data.result.userName,
        email_id: res.data.result.emailId,
        phone_number: res.data.result.phoneNumber,
        website_name: res.data.result.clientWebsiteName,
        _id: res.data.result._id
      });
      console.log("client...:", self.state.client_data)
    }).catch(function (err) {
      console.log("failed to get view client data");
    });
  }
  EditProfile() {
    this.setState({
      edit_state: !this.state.edit_state
    })
  }
  SaveProfile() {
    const self = this;
    axios({
      method: 'post',
      url: 'http://69.55.49.121:3001/v1/user/update-client',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      data: {
        "id": this.state._id,
        "firstName": this.state.first_name,
        "lastName": this.state.last_name,
        "userName": this.state.user_name,
        "emailId": this.state.email_id,
        "phoneNumber": this.state.phone_number,
        "userRoleId": 2,
        "clientWebsiteName": this.state.website_name
      }
    }).then(function (res) {
      self.setState({
        edit_state: !self.state.edit_state
      })
    }).catch(function (err) {
      console.log("Invalid Data", err);
    });
  }
  id(e) {
    this.setState({
      _id: e.target.value
    })
  }
  FirstName(e) {
    this.setState({
      first_name: e.target.value
    })
  }
  lastName(e) {
    this.setState({
      last_name: e.target.value
    })
  }
  UserName(e) {
    this.setState({
      user_name: e.target.value
    })

  }
  EmailID(e) {
    this.setState({
      email_id: e.target.value
    })
  }
  PhoneNumber(e) {
    this.setState({
      phone_number: e.target.value
    })
  }
  WebsiteNumber(e) {
    this.setState({
      website_name: e.target.value
    })
  }
  FirstNameCreate(e) {
    this.setState({
      first_name_create: e.target.value
    })
  }
  lastNameCreate(e) {
    this.setState({
      last_name_create: e.target.value
    })
  }
  UserNameCreate(e) {
    this.setState({
      user_name_create: e.target.value
    })

  }
  EmailIDCreate(e) {
    this.setState({
      email_id_create: e.target.value
    })

  }
  PhoneNumberCreate(e) {
    this.setState({
      phone_number_create: e.target.value
    })
  }
  WebsiteNumberCreate(e) {
    this.setState({
      website_name_create: e.target.value
    })
  }
  CancelProfile() {
    this.setState({
      edit_state: !this.state.edit_state
    })
  }
  WebsiteName(e) {
    this.setState({
      website_name: e.target.value
    })
  }
  PasswordCreate(e) {
    this.setState({
      password_create: e.target.value
    })
  }
  CreateClient() {
    console.log("clicked")
    this.setState({
      add_client: true
    })
  }
  CancelclientCreation() {
    this.setState({
      add_client: false
    })
  }
  CreateClientData() {
    const self = this;

    axios({
      method: 'post',
      url: 'http://69.55.49.121:3001/v1/user/create-client',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      data: {
        "firstName": this.state.first_name_create,
        "lastName": this.state.last_name_create,
        "userName": this.state.user_name_create,
        "emailId": this.state.email_id_create,
        "password": this.state.password_create,
        "phoneNumber": this.state.phone_number_create,
        "userRoleId": 2,
        "clientWebsiteName": this.state.website_name_create
      }
    }).then(function (res) {
      self.setState({
        client_data: !self.state.client_data
      })
    }).catch(function (err) {
      console.log("Invalid Data", err);
    });
  }
  render() {
    const results = this.state.clientDetail;
    return (
      <div className="mar_tp2">
        <h2 className="head">Clients</h2>
        {!this.state.client_data ?
          <div>
            <Row>
              <Col xs="12">
                <Button outline color="secondary" className="btn_styl " onClick={this.CreateClient.bind(this)}  >Create Client</Button>
              </Col>
            </Row>
            {this.state.add_client &&
              <div >
                <Row className="mar_2">
                  <Col xs="6">
                    <Row>
                      <Col xs="4 fnt_wght_bold"> First Name </Col>

                      <Col xs="8"> <input type="text" value={this.state.first_name_create} onChange={this.FirstNameCreate.bind(this)} /> </Col>

                    </Row>
                  </Col>
                  <Col xs="6">
                    <Row>
                      <Col xs="4 fnt_wght_bold"> Last Name   </Col>

                      <Col xs="8"> <input type="text" value={this.state.last_name_create} onChange={this.lastNameCreate.bind(this)} /> </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mar_2">
                  <Col xs="6">
                    <Row>
                      <Col xs="4 fnt_wght_bold"> User Name </Col>

                      <Col xs="8"> <input type="text" value={this.state.user_name_create} onChange={this.UserNameCreate.bind(this)} /> </Col>
                    </Row>
                  </Col>
                  <Col xs="6">
                    <Row>
                      <Col xs="4 fnt_wght_bold"> Email ID </Col>
                      <Col xs="8"> <input type="text" value={this.state.email_id_create} onChange={this.EmailIDCreate.bind(this)} /> </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="mar_2">
                  <Col xs="6">
                    <Row>
                      <Col xs="4 fnt_wght_bold"> Phone Number </Col>

                      <Col xs="8"> <input type="text" value={this.state.phone_number_create} onChange={this.PhoneNumberCreate.bind(this)} /> </Col>
                    </Row>
                  </Col>

                  <Col xs="6">
                    <Row>
                      <Col xs="4 fnt_wght_bold"> Website Name </Col>

                      <Col xs="8"> <input type="text" value={this.state.website_name_create} onChange={this.WebsiteNumberCreate.bind(this)} /> </Col>

                    </Row>
                  </Col>

                </Row>
                <Row className="mar_2">
                  <Col xs="6">
                    <Row>
                      <Col xs="4 fnt_wght_bold"> Password </Col>

                      <Col xs="8"> <input type="text" value={this.state.password_create} onChange={this.PasswordCreate.bind(this)} /> </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="  flt_rght">
                  <span>
                    <Button onClick={this.CreateClientData.bind(this)} >Create Client</Button>
                    <span className="mar_lft5"><Button onClick={this.CancelclientCreation.bind(this)} >Cancel</Button></span>
                  </span>
                </Row>
              </div>
            }
          </div> :
          <div className="mar_2">
            <Row>
              <Col xs="12">
                <Button outline color="secondary" className="btn_sty2 " onClick={this.EditProfile.bind(this)}  >Edit</Button>
              </Col>
            </Row>
            <div >
              <Row className="mar_2">

                <Col xs="6">
                  <Row>
                    <Col xs="4 fnt_wght_bold"> First Name </Col>
                    {(!this.state.edit_state) ?
                      <Col xs="8"> {this.state.first_name} </Col> :
                      <Col xs="8"> <input type="text" value={this.state.first_name} onChange={this.FirstName.bind(this)} /> </Col>
                    }
                  </Row>
                </Col>
                <Col xs="6">
                  <Row>
                    <Col xs="4 fnt_wght_bold"> Last Name   </Col>
                    {(!this.state.edit_state) ?
                      <Col xs="8"> {this.state.last_name} </Col> :
                      <Col xs="8"> <input type="text" value={this.state.last_name} onChange={this.lastName.bind(this)} /> </Col>
                    }
                  </Row>
                </Col>
              </Row>
              <Row className="mar_2">
                <Col xs="6">
                  <Row>
                    <Col xs="4 fnt_wght_bold"> User Name </Col>
                    {(!this.state.edit_state) ?
                      <Col xs="8"> {this.state.user_name} </Col> :
                      <Col xs="8"> <input type="text" value={this.state.user_name} onChange={this.UserName.bind(this)} /> </Col>
                    }
                  </Row>
                </Col>
                <Col xs="6">
                  <Row>
                    <Col xs="4 fnt_wght_bold"> Email ID </Col>

                    {(!this.state.edit_state) ?
                      <Col xs="8"> {this.state.email_id} </Col> :
                      <Col xs="8"> <input type="text" value={this.state.email_id} disabled onChange={this.EmailID.bind(this)} /> </Col>
                    }
                  </Row>
                </Col>
              </Row>
              <Row className="mar_2">
                <Col xs="6">
                  <Row>
                    <Col xs="4 fnt_wght_bold"> Phone Number </Col>
                    {(!this.state.edit_state) ?
                      <Col xs="8"> {this.state.phone_number} </Col> :
                      <Col xs="8"> <input type="text" value={this.state.phone_number} onChange={this.PhoneNumber.bind(this)} /> </Col>
                    }
                  </Row>
                </Col>
                {this.state.website_name &&
                  <Col xs="6">
                    <Row>
                      <Col xs="4 fnt_wght_bold"> Website Name </Col>
                      {(!this.state.edit_state) ?
                        <Col xs="8"> {this.state.website_name} </Col> :
                        <Col xs="8"> <input type="text" value={this.state.website_name} onChange={this.WebsiteNumber.bind(this)} /> </Col>
                      }
                    </Row>
                  </Col>
                }
              </Row>
              <Row className="  flt_rght">
                {(!this.state.edit_state) ?
                  <span></span> :
                  <span>
                    <Button className="client_btn" onClick={this.SaveProfile.bind(this)} >Save</Button>
                    <span className="mar_lft5"><Button className="client_btn1" onClick={this.CancelProfile.bind(this)} >Cancel</Button></span>
                  </span>
                }
              </Row>
            </div>
          </div>
        }
      </div>
    );
  }
}
export default Clients;

