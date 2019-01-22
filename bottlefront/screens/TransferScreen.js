import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Transfer } from '../src/components';


const TransferScreen = (props)=>{
  return (
  <View style={styles.container}>
    <Transfer {...props}/>
  </View>
  )
}

const styles = {
  container: {
    flex: 1
  }
};

export default TransferScreen;
