import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class AddBtn extends Component {
  static defaultProps = {
      title:'ProjectMgr'
  }

  onPress(){
    this.props.navigator.push({
      id: 'add'
    });
  }

  render() {
    return (
      <TouchableHighlight
      style={styles.button}
      onPress={this.onPress.bind(this)}>
        <Text style={styles.text}>Add Project</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    backgroundColor:'#066377',
    padding:10,
    margin:10
  },
  text:{
    color:'#ffffff',
    textAlign:'center'
  }
});

AppRegistry.registerComponent('AddBtn', () => AddBtn);
