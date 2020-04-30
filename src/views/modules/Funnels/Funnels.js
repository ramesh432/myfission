import React, { Component } from 'react';
import {
  Container, Row, Col, Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, FormText
} from 'reactstrap';
import axios from 'axios';
// import toastr from 'reactjs-toastr';
import ReactPaginate from 'react-paginate';
import toastr from 'toastr';
import App from '../../../App';
class Funnels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perpage: 6,
      totalCount: 0,
      totalPages: 1,
      error_state: "",
      modal: false,
      modal_update: false,
      vertical_name: "",
      delete_state: [],
      funnelDetail: {},
      filtered: [],
      Id: "",
      search_state: "",
      verticals_list: [],
      currentItem: { verticalName: '', key: '' }
    };
    this.toggle = this.toggle.bind(this);
    this.RowClick = this.RowClick.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
      error_state:""
    });
  }

  componentDidMount() {
    this.getFunnelsList();
  }
  getFunnelsList() {
    var self = this;
    axios({
      method: 'POST',
      url: 'http://69.55.49.121:3001/v1/funnels/get-funnels-list',
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
        verticals_list: res.data.result.list.reverse()
      })
    }).catch(function (err) {
      console.log("failed to get view client data", err);
    });
  }
  RowClick(event) {
    this.setState({
      delete_state: event.target.id
    })
  }
  VerticalName(e) {
    const itemText = e.target.value
    const currentItem = { verticalName: itemText, key: Date.now() }
    this.setState({
      currentItem,
      error_state:""
    })
  }
  Save(e) { debugger;
    
    const newItem = this.state.currentItem
      if(!this.state.currentItem.verticalName){
      this.setState({
             error_state: "Please Enter Vertical Name"
        //  toastr.success('Funnel created successfully', 'Success', {timeOut: 3000})
           })
     }
     if(this.state.currentItem.verticalName){
        var abc = this.state.verticals_list.filter((contact) => {
         if (contact.verticalName.toLowerCase().indexOf(this.state.currentItem.verticalName.toLowerCase()) != -1)
          return true;
        
      })
       if (abc.length == 0) {
        if (newItem !== '') {
          const verticals_list = [...this.state.verticals_list, newItem]
          this.setState({
            verticals_list: verticals_list,
            currentItem: { verticalName: '' },
            modal: !this.state.modal
          })
        }
        const self = this;
        axios({
          method: 'post',
          url: 'http://69.55.49.121:3001/v1/funnels/create-funnel',

          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          data: {
            "verticalName": this.state.currentItem.verticalName
          }
        }).then(function (res) {
          self.setState({
            error_state: " "
            //  toastr.success('Funnel created successfully', 'Success', {timeOut: 3000})
          })
          toastr.success('Funnel created successfully', 'Success', { timeOut: 2000 })

        }).catch(function (err) {
          toastr.error(err.response.data.result.error_message.error, 'Error', { timeOut: 2000 })
          console.log("Invalid Data", err);
        });
      }
      else {
        this.setState({
          error_state: "Vertical Name already Exists"
          //  toastr.success('Funnel created successfully', 'Success', {timeOut: 3000})
        })
      }
    }
   
  }

   Update() { 
     if(this.state.currentItem.verticalName!== " "){
             var todos = [...this.state.verticals_list];
        var index = todos.findIndex((todo) => todo._id == todo._id)
    
        let obj = this.state.verticals_list.find(o => o.verticalName === this.state.currentItem.verticalName);
        if(obj){
            
          this.setState({
            error_state:"Vertical Name already Exists"
          })
        }
        
        else if(!obj){
            this.setState({
          verticals_list: todos,
          modal_update: !this.state.modal_update
        });
        const self = this;
        axios({
          method: 'post',
          url: 'http://69.55.49.121:3001/v1/funnels/update-funnel',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          data: {
            "id": this.state.Id,
            "verticalName": this.state.currentItem.verticalName
          }
        }).then(function (res) {
          toastr.success('Funnel updated successfully', 'Success', {timeOut: 3000})
          self.getFunnelsList();
          self.setState({
            error_state:" "
          })
        }).catch(function (err) {
          console.log("Invalid Data", err);
          toastr.error(err.response.data.result.error_message.error, 'Error', {timeOut: 3000})
        });
        }
     }
     else{
       this.setState({
        error_state:"Please enter Vertical Name"
      })
    }
     
  }
  deleteItem = key => {
    const filteredItems = this.state.verticals_list.filter(item => {
      return item._id !== key
    })
    this.setState({
      verticals_list: filteredItems,
    })
    axios({
      method: 'post',
      url: 'http://69.55.49.121:3001/v1/funnels/delete-funnel',

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      data: {
        "id": key
      }
    }).then(function (res) {

      toastr.success('Funnel deleted successfully', 'Success', { timeOut: 2000 })

    }).catch(function (err) {
      toastr.error(err.response.data.result.error_message.error, 'Error', { timeOut: 2000 })
      console.log("Invalid Data", err);
    });
  }
  toggle_update = (key, verticalName) => {
     const currentItem = { verticalName: verticalName, key: Date.now() }
    this.setState({
      modal_update: !this.state.modal_update,
      currentItem,
      Id: key
    })
  }
  Search(e) {
    this.setState({
      search_state: e.target.value.substr(0, 20)
    })
  }
  handlePageClick = data => {
    let selected = data.selected + 1;
    let offset = Math.ceil(this.state.perPage * this.state.totalCount);

    this.setState({ page: selected }, () => {
      this.getFunnelsList();
    });
  };
  render() {
    var results = this.state.verticals_list.filter((contact) => {
       return contact.verticalName.toLowerCase().indexOf(this.state.search_state.toLowerCase()) != -1;
    })
    // var results = this.state.verticals_list
    return (
      <Container className="mar_tp2">
        <Row>
          <Col xs="6"> <h2 className="head">Modules <span>&gt;</span><span> Funnels</span></h2></Col>
          {/* <p onClick={()=>toastr.success('Success Message', 'Title', {displayDuration:3000})}>Show Success Message</p> */}
          <Col xs="6"> <Button outline color="secondary" className="btn_sty4" onClick={this.toggle}>Add New Vertical</Button>{' '}</Col>
          <Modal isOpen={this.state.modal} toggle={this.toggle}  >
            <ModalHeader toggle={this.toggle}>Add New Vertical</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for="examplePassword" sm={3}>Vertical Name</Label>
                  <Col sm={9}>
                    <Input type="text" name="password" id="examplePassword" placeholder="Vertical Name" onChange={this.VerticalName.bind(this)} />
                  </Col>
                </FormGroup>
                <div className="error_style">{this.state.error_state}</div>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.Save.bind(this)}>Save</Button>{' '}
              {/* <Button color="secondary" onClick={this.toggle}>Cancel</Button> */}
            </ModalFooter>
          </Modal>
        </Row>
        <Row>
          <Col xs="6" className="mar_tp2 mar_btm2">
            <Input type="search" name="search" value={this.state.search_state} placeholder="Search" className="srch_width frm_cntrl" onChange={this.Search.bind(this)} />
           
          </Col>
        </Row>
        <Row className="mar_tp2">
          <Table>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Vertical Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 && results.map((r, index) => (
                <tr id={r._id} onClick={this.RowClick}  >
                  <td> {index + 1}</td>
                  <td>{r.verticalName}</td>
                  <td>
                    <Button outline color="secondary" className="btn_sty2 " onClick={() => this.toggle_update(r._id, r.verticalName)} >Edit</Button>
                    <Button onClick={() => { this.onClick() }} outline color="secondary" className="btn_sty3 " onClick={() => this.deleteItem(r._id)} >Delete</Button>
                    {/* <button onClick={this.onClick}>click me</button> */}
                  </td>
                  <Modal isOpen={this.state.modal_update} toggle={this.toggle_update}  >
                    <ModalHeader toggle={this.toggle_update}>Update Vertical</ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup row>
                          <Label for="examplePassword" sm={3}>Vertical Name</Label>
                          <Col sm={9}>
                            <Input type="text" name="password" id="examplePassword" value={this.state.currentItem.verticalName} placeholder="Vertical Name" onChange={this.VerticalName.bind(this)} />
                          </Col>
                        </FormGroup>
                        <div className="error_style">{this.state.error_state}</div>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.Update.bind(this)}>Update</Button>{' '}
                      {/* <Button color="secondary" onClick={this.toggle_update}>Cancel</Button> */}
                    </ModalFooter>
                  </Modal>
                </tr>
              ))}
              {
                results.length <= 0 &&
                <tr>
                  <td colSpan="3"> No Records Found</td>
                </tr>
              }
            </tbody>
          </Table>
          {this.state.verticals_list.length > 0 &&
            < div className="pagi">
              <ReactPaginate
                previousLabel={<i className='fa fa-angle-left' aria-hidden='true' />}
                nextLabel={<i className='fa fa-angle-right' aria-hidden='true' />}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={this.state.perpage}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          }
        </Row>
      </Container >
    );
  }
}
export default Funnels;

