import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { connect } from 'react-redux';
import { scale, renderMsg } from '../utils'

import * as actions from '../actions';


class Transfer extends Component {
  constructor(){
    super();

    this.state = {
      to: '',
      amount: ''
    }
  }

  transfer = () => {
    const data = {
      to: this.state.to,
      amount: this.state.amount
    }
    if(data.to.length == 0 || data.amount.length == 0){
      this.props.errorMsg('Please fill the form');
    } else if(data.to.toLowerCase() == this.props.userData.email.toLowerCase()){
      this.props.errorMsg('Please enter the destination email');
    } else {
      this.props.transfer(data);
      this.setState({to: '', amount: ''});
    }
  }

  render(){
    return (

      <KeyboardAwareScrollView
        style={{ backgroundColor: '#faf9f9' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
      >
          <View style={styles.spacing}>
            { this.props.msg.err.length > 0 ? renderMsg(this.props.msg.err, 1) : null }
            { this.props.msg.succ.length > 0 ? renderMsg(this.props.msg.succ, 0) : null }
            { false ? <Animated.View style={{opacity: this.fadeAmin}}><Text style={styles.succ}> 'sdfsfdf' </Text></Animated.View> : null }
          </View>
          <View style={styles.input}>
            <FormLabel>E-mail</FormLabel>
           <View style={styles.border}>
            <FormInput
              onChangeText={(text) => this.setState({to:text})}
              value={this.state.to}
              autoCorrect={false}
              containerStyle={{borderBottomColor: 'rgba(255, 255, 255, 0)',}} />
            </View>
            <FormLabel>Points</FormLabel>
           <View style={styles.border}>
            <FormInput
              onChangeText={(text) => this.setState({amount:text})}
              value={this.state.amount}
              autoCorrect={false}
              keyboardType="number-pad"
              containerStyle={{borderBottomColor: 'rgba(255, 255, 255, 0)',}}/>
           </View>
          </View>
          <View style={styles.submit}>
              <Button
              rounded
              color={'white'}
              backgroundColor={'#517fa4'}
              icon={{name: 'arrow-circle-right', type: 'font-awesome'}}
              title='Transfer'
              containerViewStyle={{width: '70%'}}
              onPress={this.transfer} />
          </View>
        </KeyboardAwareScrollView>
    )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f9',
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  input: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submit: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spacing: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  },
  border:{
   borderColor:'lightgrey',
   backgroundColor:'white',
   borderWidth: 1,
   borderStyle: 'solid',
   width: '80%',
   fontSize:15,
   borderRadius: 25,
 }
});


//<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

const mapStateToProps = ({user, msg}) => {
  const {userData} = user;
  return {
    userData,
    msg
  }
}


export default connect(mapStateToProps, actions)(Transfer);
