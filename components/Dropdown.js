'use strict';

import React, {Component, PropTypes, StyleSheet, Text, View} from 'react-native';
import DropdownButton from './DropdownButton';

export default class Dropdown extends Component {
  render() {
    let {items, defaultSelectedIndex, placeholderText} = this.props;
    if (defaultSelectedIndex >= 0 && defaultSelectedIndex < items.length) {
      placeholderText = items[defaultSelectedIndex];
    }
    return (
      <DropdownButton placeholderText={placeholderText}/>
    );
  }
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  defaultSelectedIndex: PropTypes.number,
  placeholderText: PropTypes.string, // only used if no defaultSelectedIndex is specified.
};

Dropdown.defaultProps = {
  items: [],
  defaultSelectedIndex: -1,
  placeholderText: 'Please select',
};
