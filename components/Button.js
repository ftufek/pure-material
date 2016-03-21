'use strict';

import React, {Component, PropTypes, StyleSheet, Text, View} from 'react-native';

export default class Button extends Component {
  render() {
    const { style, children, text = '' } = this.props;
    let content;
    if (children) {
      content = children;
    } else {
      content = <Text>{text}</Text>;
    }
    return (
      <View style={[style, styles.container]}>
        {content}
      </View>
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
