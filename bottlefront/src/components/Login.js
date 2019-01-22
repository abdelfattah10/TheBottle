import React, { Component } from 'react';
import { View, Text, Button, Dimensions, KeyboardAvoidingView } from 'react-native';
import { FormLabel, FormInput, SocialIcon, Button as ButtonNative } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect} from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';
import { IP } from '../../config';

const wd = (Dimensions.get('window').width)/1.5;

class Login extends Component {
  constructor(){
    super();
    this.logIn = this.logIn.bind(this);

    this.state = {
      email: '',
      password: '',
      error: '',
    }
  }

  logIn(){
    let data = {
       email: this.state.email,
       password: this.state.password
     }
     if(data.email.length == 0 || data.password.length == 0 ){
       this.setState({error:'Please fill in the form'});
     } else {
      axios.post(`http://${IP}:3000/user/signin`, data)
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
                this.setState({error: 'Something went wrong!'})
                }
              })
              .catch((err)=>{
                this.setState({error: 'Something went wrong'})
              })
          }
        })
        .catch((err) => {
          if(err.response.status == 401){
            this.setState({error: 'Email or password is incorrect'});
           } else if(err.response.data.error){
             this.setState({error:err.response.data.error});
          }
        })
      }
    }

  render(){
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
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
                autoCorrect={false}
                containerStyle={{borderBottomColor: 'rgba(255, 255, 255, 0)',}}
                />
          </View>
          <View style={styles.border}>
            <FormInput
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password:text})}
                value={this.state.password}
                autoCorrect={false}
                containerStyle={{borderBottomColor: 'rgba(255, 255, 255, 0)',}}
                />
         </View>
        </View>

         <View style={styles.buttonStyle} >
           <ButtonNative
             rounded
             style={styles.button}
             title='LOG IN'
             backgroundColor='#517fa4'
             onPress={this.logIn}
             />
        </View>

        <View style={styles.buttonSignStyle} >
          <Button
            style={styles.signButton}
            title="Sign Up ?"
            onPress={() => {
              this.setState({error: ''})
              this.props.navigation.navigate('Signup')
             }
            }
          />
       </View>
       <View style={{height: '15%'}}></View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = {
  container : {
    flex: 1,
    backgroundColor: '#faf9f9'
  },
  inputStyle : {
    flex : 3,
    justifyContent : 'space-between',
    alignItems : 'center',
    padding : 10,
    marginTop : 100
  },
  buttonStyle : {
    flex : 3,
  },
  button : {
    width: wd,
    height: 45,
    marginTop: '10%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonSignStyle : {
    flex : 2
  },
  warn : {
    fontSize: 20,
    color: 'red'
  },
  align : {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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


export default connect(null, actions)(Login);
