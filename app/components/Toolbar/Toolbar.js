import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Toolbar extends Component {
  static defaultProps = {
      title:'ProjectMgr'
  }

  render() {
    return (
      <View style={styles.toolbarView}>
        <Text style={styles.toolbarText}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toolbarView: {
    backgroundColor: '#333333',
    padding:10
  },
  toolbarText: {
    color:'#ffffff',
    textAlign:'center'
  }
});

AppRegistry.registerComponent('Toolbar', () => Toolbar);
