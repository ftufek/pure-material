'use strict';

import React, {Component, PropTypes, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Ripple from './Ripple';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress(e) {
    this.refs.ripple.addRipple(100,15);
  }

  render() {
    const { style, children, text = '' } = this.props;
    let content;
    if (children) {
      content = children;
    } else {
      content = <Text>{text}</Text>;
    }
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={[style, styles.container]}>
          {content}
          <Ripple ref="ripple" />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    padding: 8,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
