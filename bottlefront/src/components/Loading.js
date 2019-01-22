import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import {AsyncStorage} from 'react-native';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

class Loading extends Component {
  constructor(props){
    super(props);

  }

  async componentDidMount(){
      const token =  await Expo.SecureStore.getItemAsync('token');
      console.log(1, token);
       if(token){
         this.props.getUser(token)
          .then((res) => {
            if(res == true){
              this.props.navigation.navigate('App');
            } else {
              this.props.navigation.navigate('Auth');
            }
          })
          .catch(() => {
              this.props.navigation.navigate('Auth');
          })
       } else {
         this.props.navigation.navigate('Auth');
       }
    }

  render(){
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="black" />
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  }
};

export default connect(null, actions)(Loading);
