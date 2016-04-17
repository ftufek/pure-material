'use strict';

import React, {Component, PropTypes, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Ripple from './Ripple';

export default class Button extends Component {
  render() {
    const { style, children, text = '', onPress, rippleColor } = this.props;
    let content;
    if (children) {
      content = children;
    } else {
      content = <Text>{text}</Text>;
    }
    return (
      <View style={[style, styles.container]}>
        {content}
        <Ripple ref="ripple" onPress={onPress} rippleColor={rippleColor} />
      </View>
    );
  }
}

Button.propTypes = {
  rippleColor: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    padding: 8,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
