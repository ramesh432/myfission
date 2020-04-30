import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {};
class DefaultHeader extends Component {
  render() {
  
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <div>
          <img src={'../../assets/img/avatars/logo.png'} className="logo" alt="logo" />
          <h4 className="name">Affordability</h4>
        </div>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/avatars/login.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem onClick={e => this.props.onProfile(e)}><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}
DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;
export default DefaultHeader;
