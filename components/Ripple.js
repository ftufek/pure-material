'use strict';

import React, {Animated, Component, PropTypes, StyleSheet, View} from 'react-native';

export default class Ripple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rippleScale: null,
      rippleView: null,
      width: 0,
      height: 0,
      rippleKey: 0,
    };

    this.onLayout = this.onLayout.bind(this);
    this.addRipple = this.addRipple.bind(this);
  }

  addRipple(x, y) {
    const {width: w, height: h, rippleKey} = this.state;
    const largestSide = w > h ? w : h;
    const radius = largestSide * 2; // simplifies division by 2
    const xPos = x - radius / 2;
    const yPos = y - radius / 2;
    this.setState({rippleScale: new Animated.Value(0.01)});
    const rippleView =
      <Animated.View style={[
          styles.ripple,
          {
            top: yPos,
            left: xPos,
            width: radius,
            height: radius,
            borderRadius: radius / 2,
            transform: [
              {scale: this.state.rippleScale}
            ]
          }
        ]}
        key={rippleKey}></Animated.View>;
    this.setState({rippleView});
    Animated.timing(this.state.rippleScale, {toValue: 1}).start();
  }

  onLayout({nativeEvent:{layout:{x, y, width, height}}}) {
    this.setState({width, height});
  }

  render() {
    const {rippleView} = this.state;
    return (
      <View style={styles.container} onLayout={this.onLayout}>
        {rippleView}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  ripple: {
    position: 'absolute',
    backgroundColor: 'red',
  }
});
