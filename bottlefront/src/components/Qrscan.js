import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actions from '../actions';

class Qrscan extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
        { this.props.isFocused &&
            <BarCodeScanner
              onBarCodeRead={this._handleBarCodeRead}
              style={StyleSheet.absoluteFill}
            />
        }
        </View>
      );
    }
  }

  flipScanner = () => {
    this.setState({scanned: false})
  }

  _handleBarCodeRead = (data) => {
    //alert(`Bar code with type ${data.type} and data ${data.data} has been scanned!`);
    if(this.state.scanned == false){
      const points = parseInt(data.data, 10);
      this.props.scanPoints(points, this.flipScanner, this.props.navigation);
      this.setState({ scanned: true});
    }
  }

}

export default connect(null, actions)(withNavigationFocus(Qrscan));
