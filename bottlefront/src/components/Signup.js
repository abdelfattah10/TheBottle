import React, { Component } from 'react';
import { View, Text, Button, Dimensions, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FormLabel, FormInput, Button as ButtonNative } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect} from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';
import { IP } from '../../config';

const wd = (Dimensions.get('window').width)/1.5;


class Signup extends Component {
  constructor(){
    super();

    this.signUp = this.signUp.bind(this);

    this.state = {
      email: '',
      name:'',
      password: '',
      confpassword:'',
      error:''
    }
  }

 validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
  }

  signUp(){

    let data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confpassword: this.state.confpassword
    }

   if(data.name.length == 0 || data.email.length == 0 || data.password.length == 0 || data.confpassword.length == 0 ){
     this.setState({error:'Please fill in the form'});
   } else if(!this.validateEmail(data.email)){
     this.setState({error:'Please provide valid email'});
   } else if(data.password.length < 6){
     this.setState({error:'Password must be more than 5 words'});
   } else if(data.password !== data.confpassword){
     this.setState({error:'Password and confirmation password does not match'});
   } else {
        this.setState({error:''});
          axios.post(`http://${IP}:3000/user/signup`, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          })
        .then((response) => {
           if(response.data.token){
             const token = response.data.token;

               Expo.SecureStore.setItemAsync('token', token)
               .then(() => {
                 // Call Action Creator
                 return this.props.getUser(token);
                 // Navigate
                 //this.props.navigation.navigate('App');
               })
               .then((res) => {
                 if(res){
                   this.props.navigation.navigate('App');
                 } else {
                 this.setState({error: 'Something went wrongg'})
                 }
               })
               .catch((err)=>{
                 this.setState({error: 'Something went wrong'})
               })
           }
        })
        .catch((err) => {
          if(err.response.data.error){
            this.setState({error:err.response.data.error});
          }
        });
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

        <View style={styles.align}>
          {this.state.error.length > 0 ? <Text style={styles.warn}>{this.state.error}</Text> : null}
        </View>

      <View style={styles.inputStyle} >
        <View style={styles.border}>
          <FormInput
              placeholder='E-mail'
              autoCapitalize = 'none'
              onChangeText={(text) => this.setState({email:text})}
              value={this.state.email}
              containerStyle={{borderBottomColor: 'rgba(255, 255, 255, 0)',}}
              />
        </View>
        <View style={styles.border}>
          <FormInput
              placeholder='Name'
              autoCapitalize = 'none'
              onChangeText={(text) => this.setState({name:text})}
              value={this.state.name}
              containerStyle={{borderBottomColor: 'rgba(255, 255, 255, 0)',}}
              />
        </View>
        <View style={styles.border}>
          <FormInput
              placeholder='Password'
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password:text})}
              value={this.state.password}
              containerStyle={{borderBottomColor: 'rgba(255, 255, 255, 0)',}}
              />
        </View>
        <View style={styles.border}>
          <FormInput
              placeholder='Confirm password'
              secureTextEntry={true}
              onChangeText={(text) => this.setState({confpassword:text})}
              value={this.state.confpassword}
              containerStyle={{borderBottomColor: 'rgba(255, 255, 255, 0)',}}
              />
        </View>
          </View>

          <View style={styles.buttonStyle} >
            <ButtonNative
              rounded
              style={styles.button}
              title='SIGN UP'
              backgroundColor='#517fa4'
              onPress={this.signUp}
              />
          </View>

      </KeyboardAwareScrollView>
    )
  }
}

const styles = {
  container : {
    flex: 1,
    backgroundColor: '#faf9f9'
  },
  warn : {
    fontSize: 20,
    color: 'red'
  },
  inputStyle : {
    flex : 2,
    justifyContent : 'space-between',
    alignItems : 'center',
    padding : 10,
    marginTop : 100
  },
  buttonStyle : {
    flex : 2,
    justifyContent : 'center',
    alignItems : 'center'
  },
  button : {
    width: wd,
    height: 45,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  align : {
    alignItems: 'center',
    paddingTop: 10
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
}

export default connect(null, actions)(Signup);
