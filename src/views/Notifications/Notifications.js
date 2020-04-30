import React, { Component } from 'react';
import {
	Container, Row, Col, Button, Input, Table, Modal, ModalHeader, ModalBody, ModalFooter,
	Form, FormGroup, Label, FormText
} from 'reactstrap';
import toastr from 'toastr';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
class Notifications extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			perpage: 5,
			totalCount: 0,
			totalPages: 1,
			modal: false,
			userDetails: {},
			notificationDetails: '',
			title: "",
			message: "",
			title_error:"",
			message_error:"",
			createNotification: {
				title: "",
				message: ""
			},
			notifications_list: [],
			delete_item: ''
		};
		this.toggle = this.toggle.bind(this);
	}
	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}
	componentDidMount() {
		this.notificationlist();
	}
	notificationlist() {
		var self = this;
		axios({
			method: 'POST',
			url: 'http://69.55.49.121:3001/v1/notifications/get-notifications-list',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
			data: {
				"page": self.state.page,
				"perpage": self.state.perpage,
				"filters": {
					"search": "",
					"viewRange": ""
				}
			}
		}).then(function (res) {
			self.setState({
				page: res.data.result.page,
				perpage: res.data.result.perpage,
				totalCount: res.data.result.totalCount,
				totalPages: Math.ceil(res.data.result.totalCount / res.data.result.perpage),
				notifications_list: res.data.result.list.reverse(),
			});
		}).catch(function (err) {
			console.log("failed to get view client data", err);
		});
	}
	HandleChangeTitle(e) {
		const title_text = e.target.value
		this.setState({
			title: title_text,
			title_error:""
		})
	}
	HandleChangeMessage(e) {
		const message_text = e.target.value
		this.setState({
			message: e.target.value,
			message_error:""
		})
	}
	onShowAlert = () => {
		this.count = this.count || 1
		toastr.options = {
			positionClass: '',
			hideDuration: 300,
			timeOut: 3000
		}
		toastr.clear()
		setTimeout(() => toastr.success(`Settings updated ${this.count}`), 300)
	}
	createClient() {
		if(!this.state.title && !this.state.message){
			console.log("fill the details")
			this.setState({
				title_error:"please enter title",
				message_error:"Please enter message"
			})
		}
		else if(this.state.title && this.state.message){
			console.log("entered")
		
			const createNotification = { title: this.state.title, message: this.state.message }
		const newItem = createNotification
		if (newItem !== '') {
			const notifications_list = [...this.state.notifications_list, newItem]
			this.setState({
				notifications_list: notifications_list,
				createNotification: { title: '', message: "" },
				modal: !this.state.modal
			})
		}
		const self = this;
		axios({
			method: 'post',
			url: 'http://69.55.49.121:3001/v1/notifications/create-notification',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
			data: {
				"title": createNotification.title,
				"message": createNotification.message
			}
		}).then(function (res) {
				 self.setState({
				title_error:" ",
			 	message_error:" "
			 })
			toastr.success('Notification posted successfully.', 'Sucess', { timeOut: 3000 });
			self.notificationlist();
		}).catch(function (err) {
			console.log("Invalid Data", err);
		});
		}
	}
	deleteItem = key => {
		const filteredItems = this.state.notifications_list.filter(item => {
			return item._id !== key

		})
		this.setState({
			notifications_list: filteredItems,
		})
		const self = this;
		axios({
			method: 'post',
			url: 'http://69.55.49.121:3001/v1/notifications/delete-notification',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
			data: {
				"id": key
			}
		}).then(function (res) {
			toastr.success('Notification deleted successfully.', 'Sucess', { timeOut: 3000 });
			self.notificationlist();
		}).catch(function (err) {
			console.log("Invalid Data", err);
			toastr.error(err.response.data.result.error_message.error, 'Error', { timeOut: 3000 });
		});
	}
	DeleteNotification = id => {
	}
	// handlePageChange(pageNumber) {
	// 	console.log(`active page is ${pageNumber}`);
	// 	this.setState({ page: pageNumber });
	// 	this.notificationlist();
	// }
	handlePageClick = data => {
		let selected = data.selected + 1;
		let offset = Math.ceil(this.state.perPage * this.state.totalCount);

		this.setState({ page: selected }, () => {
			this.notificationlist();
		});
	};
	render() {
		const results = this.state.notifications_list;
		return (
			<Container className="mar_tp2">
				<Row>
					<Col xs="6"> <h2 className="head">Notifications </h2></Col>
					<Col xs="6"> <Button outline color="secondary" className="btn_styl flt_rght" onClick={this.toggle} >Create</Button>{' '}</Col>
					<Modal isOpen={this.state.modal} toggle={this.toggle}  >
						<ModalHeader toggle={this.toggle}>Create</ModalHeader>
						<ModalBody>
							<Form>
								<FormGroup row>
									<Label for="examplePassword" sm={3}>Tittle</Label>
									<Col sm={9}>
										<Input type="text" name="password" id="examplePassword" placeholder="Tittle" onChange={this.HandleChangeTitle.bind(this)} />
									</Col>
									<div className="error_style_ntfcn">{this.state.title_error}</div>
								</FormGroup>
								
								<FormGroup row>
									<Label for="examplePassword" sm={3}>Message</Label>
									<Col sm={9}>
										<Input type="text" name="password" id="examplePassword" placeholder="Message" onChange={this.HandleChangeMessage.bind(this)} />
									</Col>
									<div className="error_style_ntfcn">{this.state.message_error}</div>
								</FormGroup>
								
							</Form>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.createClient.bind(this)}>Save</Button>{' '}
							{/* <Button color="secondary" toggle={this.toggle}>Cancel</Button> */}
						</ModalFooter>
					</Modal>
				</Row>
				<Row>
					<Col xs="6" className="mar_tp2 mar_btm2">
					</Col>
					<Col xs="6" className="mar_tp2 mar_btm2">
						<span className="flt_rght">
						</span>
					</Col>
				</Row>
				<Row>
					<Col xs="6" className="mar_tp2 mar_btm2">
					</Col>
				</Row>
				<Row className="mar_tp2">
					<Table>
						<thead>
							<tr>
								<th>Sno</th>
								<th>Title</th>
								<th>Message</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{results.length > 0 && results.map((r, index) => (
								<tr id={r._id}  >
									<td> {index + 1}</td>
									<td>{r.title}</td>
									<td>{r.message}</td>
									<td>
										{/* <Button outline color="secondary" className="btn_styl "  onClick={() => this.EditItem(r._id,r.title)} >Edit</Button> */}
										<Button onClick={() => { this.onShowAlert() }} outline color="secondary" className="btn_sty3 " onClick={() => this.deleteItem(r._id)} >Delete</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<div className="pagi">
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
				</Row>
			</Container>
		);
	}
}
export default Notifications;














