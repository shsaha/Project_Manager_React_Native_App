import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  Share
} from 'react-native';

export default class ProjectDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.project.id,
      name: this.props.project.name,
      category: this.props.project.category,
      description: this.props.project.description,
      leader: this.props.project.leader,
      due: this.props.project.due
    }
  }

  onEdit(){
    let project = {
      id: this.state.id,
      name: this.state.name,
      category: this.state.category,
      description: this.state.description,
      leader: this.state.leader,
      due: this.state.due
    }

    this.props.navigator.push({
      id:'edit',
      project:project
    });
  }

  onDelete(){
    AsyncStorage.getItem('projects').then((value) => {
      let projects = JSON.parse(value);

      for(let i = 0;i < projects.length;i++){
        if(projects[i].id == this.state.id){
          projects.splice(i, 1);
        }
      }

      AsyncStorage.setItem('projects', JSON.stringify(projects));

      this.props.navigator.push({
        id:'projects'
      });
    });
  }

  onShare(){
    Share.share({
      message: this.state.description
    })
    .then(() => {
      this.props.navigator.push({
        id:'projects'
      });
    })
    .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.text}>Category: {this.state.category}</Text>
          <Text style={styles.text}>Leader: {this.state.leader}</Text>
          <Text style={styles.text}>Due On: {this.state.due}</Text>
          <Text style={styles.description}>Project Info: {this.state.description}</Text>
        </View>
        <TouchableHighlight
          style={styles.btn}
          onPress={this.onEdit.bind(this)}>
          <Text style={styles.text}>Edit Project</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.btn}
          onPress={this.onDelete.bind(this)}>
          <Text style={styles.text}>Delete Project</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.btn}
          onPress={this.onShare.bind(this)}>
          <Text style={styles.text}>Send To Contact</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:15
  },
  text: {
    color:'#ffffff',
    textAlign:'center'
  },
  btn:{
    borderWidth:2,
    borderColor:'#ffffff',
    padding:10,
    margin:5
  },
  info: {
    marginBottom:10
  },
  description: {
    backgroundColor:'#333333',
    color:'#ffffff',
    padding:5,
    textAlign:'center',
    margin:10
  }
});

AppRegistry.registerComponent('ProjectDetails', () => ProjectDetails);
