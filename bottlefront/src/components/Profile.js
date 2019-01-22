import React, { Component } from 'react';
import { Avatar, Icon, Divider, Card, Button as ButtonNative } from 'react-native-elements';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { connect } from 'react-redux';
import { scale, renderMsg } from '../utils'

import * as actions from '../actions';


class Profile extends Component {
  constructor(){
    super();

  }

  signOut = () => {
    this.props.signOut(this.props.navigation.navigate)
  }

  render(){
    console.log(1, this.props.msg);
    return (
      <View style={styles.container}>

        <View style={styles.spacing}>
          { this.props.msg.err.length > 0 ? renderMsg(this.props.msg.err, 1) : null }
          { this.props.msg.succ.length > 0 ? renderMsg(this.props.msg.succ, 0) : null }
          { false ? <Animated.View style={{opacity: this.fadeAmin}}><Text style={styles.succ}> 'sdfsfdf' </Text></Animated.View> : null }
        </View>
        <View style={styles.boxOne}>
          <Card >
           <Avatar
            large
            rounded
            title={this.props.userData.name[0]}
            onPress={() => {}}
            activeOpacity={0.3}
            overlayContainerStyle={{backgroundColor: '#517fa4'}}
            containerStyle={{marginTop: 0, marginRight: 'auto', marginBottom: '5%', marginLeft: 'auto',}}
           />
           <Text style={styles.name}>
               {this.props.userData.name}
           </Text>
           <Text style={styles.email}>
               {this.props.userData.email}
           </Text>
           <Divider style={{ backgroundColor: '#E0E0E0', marginTop: '5%' }} />
            <View style={styles.pointsBox}>
             <Icon
               reverse
               name='md-trophy'
               type='ionicon'
               color='#517fa4'
               size={18}
             />
           <Text style={styles.pointsTitle}>Points</Text>
            </View>
           <Text style={styles.points}>
               {this.props.userData.points}
           </Text>
          </Card>
        </View>
        <View style={styles.boxTwo}>
          <ButtonNative
            title='Sign out'
            onPress={this.signOut}
            backgroundColor={'#faf9f9'}
            color={'red'}
            containerViewStyle={{width: '60%'}}/>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f9',
  },
  spacing: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxOne: {
    flex: 5,
  },
  boxTwo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: scale(30),
    textAlign: 'center',
    color: '#404040'
  },
  email: {
    fontSize: scale(20),
    textAlign: 'center',
    color: 'grey'
  },
  pointsBox: {
    flexDirection: 'row',
  },
  pointsTitle: {
    fontWeight: 'bold',
    fontSize: scale(16),
    marginTop: '5%',
    color: '#404040'
  },
  points: {
    fontWeight: 'bold',
    fontSize: scale(30),
    textAlign: 'center',
    marginBottom: '15%',
    color: '#404040'
  }
});


const mapStateToProps = ({user, msg}) => {
  const {userData} = user;
  return {
    userData,
    msg
  }
}

export default connect(mapStateToProps, actions)(Profile);
