import React, { Component } from 'react';
import axios from 'axios';
import { Button, Col, Row } from 'reactstrap';
const roleId = localStorage.getItem("roleId");
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_data: {},
      edit_state: false,
      // _id: "5cf5067f5ad96a71bfc9b49f",
      // _id: "5cdbc495cf006600b0206105",
      first_name: "",
      last_name: "",
      user_name: "",
      email_id: "",
      phone_number: "",
      website_name: "",
      _id: ""
    }
  }
  componentDidMount() {
    var self = this;
    axios({
      method: 'POST',
      url: 'http://69.55.49.121:3001/v1/user/view-profile',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    }).then(function (res) {
      self.setState({
        profile_data: res.data.result,
        first_name: res.data.result.firstName,
        last_name: res.data.result.lastName,
        user_name: res.data.result.userName,
        email_id: res.data.result.emailId,
        phone_number: res.data.result.phoneNumber,
        website_name: res.data.result.clientWebsiteName,
        _id: res.data.result._id
      });
    }).catch(function (err) {

      console.log("failed to get view client data", err);
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
        "userRoleId": localStorage.getItem('roleId'),
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
  render() {
    const result = this.state.profile_data
    return (
      <div className="mar_tp2">
        <h2>My Profile</h2>
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
                    <Col xs="8"> {this.state.email_id}</Col> :
                    <Col xs="8"> <input type="text" value={this.state.email_id} onChange={this.EmailID.bind(this)} /> </Col>
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
                  <span className="mar_lft5"><Button className="client_btn" onClick={this.CancelProfile.bind(this)} >Cancel</Button></span>
                </span>
              }
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;



