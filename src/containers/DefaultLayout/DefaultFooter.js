import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};
const defaultProps = {};
class DefaultFooter extends Component {
  render() {
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <span><a href="https://fission.it"></a> &copy;Fission.it</span>
        <span className="ml-auto">Powered by <a href="https://fission.it">Fission infoTech</a></span>
      </React.Fragment>
    );
  }
}
DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;
export default DefaultFooter;
