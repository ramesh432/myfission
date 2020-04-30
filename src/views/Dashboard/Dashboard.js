import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';
class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            role_id: ""
        }
    }
    componentDidMount() {
        this.setState({
            role_id: localStorage.getItem('roleId')
        })
    }
    Clients() {
        this.props.history.push('./Clients')
    }
    Users() {
        this.props.history.push('./Users')
    }
    Funnels() {
        this.props.history.push('./modules/Funnels')
    }
    Notifications() {
        this.props.history.push('./Notifications')
    }
    Reports() {
        this.props.history.push('./ReportGeneration')
    }
    render() {
        return (
            <div className="mar_tp2">
                <h2 className="head">
                    Dashboard
                </h2>
                <div className="dashboard">
                    <Row>
                        <Col xs="6"> <h5 className="txt_dec">Quick Links</h5></Col>
                        <Col xs="6">  <h5 className="txt_dec">More Actions</h5></Col>
                    </Row>
                    <Row>
                        {this.state.role_id == 1 ?
                            <Col xs="6"> <Button color="link" onClick={this.Clients.bind(this)}>Clients</Button></Col> :
                            <Col xs="6"><Button color="link" onClick={this.Users.bind(this)}>Users</Button>  </Col>
                        }
                        <Col xs="6"> <Button color="link" onClick={this.Funnels.bind(this)}>Funnels</Button></Col>
                    </Row>
                    <Row>
                        <Col xs="6"><Button color="link" onClick={this.Notifications.bind(this)}>Notifications</Button>  </Col>
                        <Col xs="6"><Button color="link" onClick={this.Reports.bind(this)}>Report Generation</Button></Col>
                    </Row>
                </div>
            </div>
        );
    }
}
export default Dashboard;
