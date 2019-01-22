import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Profile } from '../src/components';


const ProfileScreen = (props)=>{
  return (
  <View style={styles.container}>
    <Profile {...props}/>
  </View>
  )
}

const styles = {
  container: {
    flex: 1
  }
};

export default ProfileScreen;
