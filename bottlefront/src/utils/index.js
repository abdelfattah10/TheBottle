import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;


export const scale = size => width / guidelineBaseWidth * size;


export const renderMsg = (msg, index) => {
  const fadeAmin = new Animated.Value(1);
    Animated.timing(fadeAmin,
     {
       toValue: 0,
       duration: 3000
     }
    ).start()
  return (
    index == 0 ? <Animated.View style={{opacity: fadeAmin}}><Text style={styles.succ}> {msg} </Text></Animated.View> :
                 <Animated.View style={{opacity: fadeAmin}}><Text style={styles.err}> {msg} </Text></Animated.View>
  )
}

const styles = StyleSheet.create({
  succ: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(18),
    color: 'green'
  },
  err: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: scale(18),
    color: 'red'
  }
});
