'use strict';

import React, {Component, Platform, PropTypes, StyleSheet, View} from 'react-native';

export default class Card extends Component {
  render() {
    const {children, style, zIndex} = this.props;
    let extraStyle = {};
    if (Platform.OS == 'android') {
      extraStyle.elevation = zIndex;
    } else {
      // TODO(ftufek): handle ios shadow using ShadowPropTypesIOS
    }
    return (
      <View {...this.props} style={[styles.container, style, extraStyle]}>
        {children}
      </View>
    );
  }
}

Card.propTypes = {
  zIndex: PropTypes.number,
};

Card.defaultProps = {
  zIndex: 1,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 2,
  }
});
