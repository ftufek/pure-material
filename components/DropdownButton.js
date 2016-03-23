'use strict';

import React, {Component, Image, PropTypes, StyleSheet, Text, View} from 'react-native';

export default class DropdownButton extends Component {
  render() {
    const {placeholderText, arrowDirection} = this.props;
    let arrowImage;
    if (arrowDirection == 'up') {
      arrowImage = require('./resources/icons/navigation/arrow_drop_up_black_24dp.png');
    } else {
      arrowImage = require('./resources/icons/navigation/arrow_drop_down_black_24dp.png');
    }
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>
          <Text>{placeholderText}</Text>
          <Image source={arrowImage} />
        </Text>
      </View>
    );
  }
}

DropdownButton.propTypes = {
  arrowDirection: PropTypes.oneOf(['up', 'down']),
  placeholderText: PropTypes.string,
};

DropdownButton.defaultProps = {
  arrowDirection: 'down',
  placeholderText: 'Please select',
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    alignSelf: 'flex-start',
  },
  placeholder: {
    flexWrap: 'nowrap',
  },
});
