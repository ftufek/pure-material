'use strict';

import React, {Animated, Component, Easing, PanResponder, PropTypes, StyleSheet, View} from 'react-native';

export default class Ripple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rippleScale: null,
      rippleOpacity: null,
      rippleView: null,
      width: 0,
      height: 0,
      panResponder: null,
    };

    this.onLayout = this.onLayout.bind(this);
    this.addRipple = this.addRipple.bind(this);
    this.cleanRipple = this.cleanRipple.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  addRipple(x, y) {
    if (this.state.rippleView) {
      // TODO(ftufek): for now just supports a single ripple at a time
      // add support for multiple
      return;
    }
    const {width: w, height: h} = this.state;
    const {rippleColor} = this.props;
    const largestSide = w > h ? w : h;
    const radius = largestSide * 2; // simplifies division by 2
    const xPos = x - radius / 2;
    const yPos = y - radius / 2;
    const duration = 500;
    this.setState({
      rippleScale: new Animated.Value(0.01),
      rippleOpacity: new Animated.Value(0.4),
    });
    const rippleView =
      <Animated.View style={[
          styles.ripple,
          {
            top: yPos,
            left: xPos,
            width: radius,
            height: radius,
            borderRadius: radius / 2,
            backgroundColor: rippleColor || 'white',
            opacity: this.state.rippleOpacity,
            transform: [
              {scale: this.state.rippleScale}
            ]
          }
        ]}></Animated.View>;
    this.setState({rippleView});
    Animated.timing(this.state.rippleScale, {
      toValue: 1,
      duration,
      easing: Easing.linear
    }).start();
  }

  cleanRipple() {
    Animated.timing(this.state.rippleOpacity, {
      toValue: 0,
    }).start(() => {
      if (!this.isMounted_) { return; }
      this.setState({
        rippleView: null,
      });
    });
  }

  onPress() {
    const {onPress} = this.props;
    if (onPress) {
      onPress();
    }
    this.cleanRipple();
  }

  componentWillMount() {
    let cancelled = false;
    // TODO(ftufek): touch cancellation on user move should be better handled
    // release touch when the touch is considered cancelled.
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, {dx, dy, moveX, moveY}) => {
        if (dy > 15 || dy < -15) {
          // TODO(ftufek): also check for the user going out of bounds
          this.cleanRipple();
          cancelled = true;
        }
      },
      onPanResponderGrant: ({nativeEvent: {locationX, locationY}}) => {
        this.addRipple(locationX, locationY);
      },
      onPanResponderTerminationRequest: this.cleanRipple,
      onPanResponderRelease: () => {
        if (!cancelled) {
          this.onPress();
        } else {
          this.cleanRipple();
        }
        cancelled = false;
      },
      onPanResponderTerminate: this.cleanRipple,
    });
    this.setState({panResponder});
    this.isMounted_ = true;
  }

  componentWillUnmount() {
    this.isMounted_ = false;
  }

  onLayout({nativeEvent:{layout:{x, y, width, height}}}) {
    this.setState({width, height});
  }

  render() {
    const {rippleView, panResponder} = this.state;
    return (
      <View style={styles.container}
          onLayout={this.onLayout}
          {...panResponder.panHandlers}>
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
  },
  ripple: {
    position: 'absolute',
  }
});
