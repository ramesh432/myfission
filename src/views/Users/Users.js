import React, { Component } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactDOM from "react-dom";
import ReactPaginate from 'react-paginate';
import { Container, Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perpage: 500,
      totalCount: 0,
      totalPages: 1,
      modal: false,
      data: {},
      userDetails: {},
      userList: {},
      show_details: "",
      address_data: ""
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentDidMount() {
    this.getSubscribersList();
  }
  getSubscribersList() {
    var self = this;
    console.log(self.state.page, "===========", self.state.perpage);
    axios({
      method: 'POST',
      url: 'http://69.55.49.121:3001/v1/userTemplates/get-subscribers-list',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      data: {
        "page": self.state.page,
        "perpage": self.state.perpage,
        "filters": {
          "search": ""
        }
      }
    }).then(function (res) {
      self.setState({
        page: res.data.result.page,
        perpage: res.data.result.perpage,
        totalCount: res.data.result.totalCount,
        totalPages: Math.ceil(res.data.result.totalCount / res.data.result.perpage),
        userDetails: res.data.result.list
      });
      console.log(self.state.page, "=====success======", self.state.perpage);

    }).catch(function (err) {
      console.log("failed to get view client data", err);
    });
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ page: pageNumber });
    this.getSubscribersList()
  }
  ShowDetails(id) {
    this.setState({
      modal: !this.state.modal,
    })
    var that = this;
    axios({
      method: 'POST',
      url: 'http://69.55.49.121:3001/v1/userTemplates/get-subscriber-details',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      data: {
        "id": id,
      }
    }).then(function (res) {
      that.setState({
        userList: res.data.result,
        address_data: res.data.result.propertyInfo.address,
        bankruptcy_data: res.data.result.bankruptcy,
        isVeteran_data: res.data.result.isVeteran,
        borrowAddCash_data: res.data.result.borrowAddCash
      });
    }).catch(function (err) {
      console.log("failed to get data", err);
    });
  }

  render() {
    var data = this.state.userDetails
    var userlist = this.state.userList
    return (
      <Container className="mar_tp2">
        <Row>
          <Col xs="6"> <h2 className="head">Users </h2></Col>
          {/* <Col xs="6"> <Button outline color="secondary" className="btn_styl flt_rght" onClick={this.toggle} >Add New Client</Button>{' '}</Col> */}
          <Modal isOpen={this.state.modal} toggle={this.toggle}  >
            <ModalHeader toggle={this.toggle}>User Details</ModalHeader>
            <ModalBody>
              <div className="hack1">
                <div className="hack2">
                  <Table className="hack3">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>LoanType</th>
                        <th>propertyType</th>
                        <th>Credit</th>
                        <th>PropertyValue</th>
                        <th>MortageBalance</th>
                        <th>CurrentInterestRate</th>
                        <th>DownPayament</th>
                        <th>Bankruptcy</th>
                        <th>DesireLoanType</th>
                        <th>IsVeteran</th>
                        <th>MortageRates</th>
                        <th>BorrowAddCash</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>EmailId</th>
                        <th>PhoneNumber</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{userlist.registerId}</td>
                        <td>{userlist.loanType}</td>
                        <td>{userlist.propertyType}</td>
                        <td>{userlist.credit}</td>
                        <td>{userlist.propertyValue}</td>
                        <td>{userlist.mortageBalance}</td>
                        <td>{userlist.currentInterestRate}</td>
                        <td>{userlist.downPayament}</td>
                        {this.state.bankruptcy_data == true ?
                          <td>True</td> : <td>False</td>}
                        <td>{userlist.desireLoanType}</td>
                        {this.state.isVeteran_data == true ?
                          <td>True</td> : <td>False</td>
                        }
                        <td>{userlist.mortageRates}</td>
                        {this.state.borrowAddCash_data == true ?
                          <td>True</td> : <td>False</td>
                        }
                        <td>{userlist.firstName}</td>
                        <td>{userlist.lastName}</td>
                        <td>{userlist.emailId}</td>
                        <td>{userlist.phoneNumber}</td>
                        <td>{this.state.address_data}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
            </ModalFooter>
          </Modal>
        </Row>
        <Row>
          <Col xs="6" className="mar_tp2 mar_btm2">
          </Col>
        </Row>
        <Row className="mar_tp2">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="Users"
            sheet="tablexls"
            buttonText="Download Users" />
          <Table id="table-to-xls">
            <thead>
              <tr>
                <td>S no</td>
                <th>Email Id</th>
                <th> First Name</th>
                <th>Last Name</th>
                <th>Loan Type</th>
                <th>Phone Number</th>
                <th>Property Type</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 && data.map((r, index) => (
                <tr onClick={() => this.ShowDetails(r._id, r.firstName)} >
                  <td>{index + 1}</td>
                  <td>{r.emailId}</td>
                  <td>{r.firstName}</td>
                  <td>{r.lastName}</td>
                  <td>{r.loanType}</td>
                  <td>{r.phoneNumber}</td>
                  <td>{r.propertyType}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pagi">
          </div>
        </Row>
      </Container>
    );
  }
}
export default Users;












