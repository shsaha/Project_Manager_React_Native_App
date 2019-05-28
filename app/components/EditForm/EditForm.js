import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';

export default class EditForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      id:this.props.project.id,
      name:this.props.project.name,
      category:this.props.project.category,
      description:this.props.project.description,
      leader:this.props.project.leader,
      due:this.props.project.due
    }
  }

  onSubmit(){
    AsyncStorage.getItem('projects').then((value) => {
      let projects = JSON.parse(value);

      for(let i = 0;i < projects.length;i++){
        if(projects[i].id == this.state.id){
          projects.splice(i, 1);
        }
      }

      projects.push({
        id: this.state.id,
        name: this.state.name,
        category: this.state.category,
        description: this.state.description,
        leader: this.state.leader,
        due: this.state.due
      });

      AsyncStorage.setItem('projects', JSON.stringify(projects));

      this.props.navigator.push({
        id:'projects'
      });
    });
  }

  render() {
    return (
      <View style={styles.addForm}>
        <TextInput
          value={this.state.name}
          placeholder="Project Name"
          onChangeText = {(value) => this.setState({name:value})}
        />
        <TextInput
          value={this.state.category}
          placeholder="Project Category"
          onChangeText = {(value) => this.setState({category:value})}
        />
        <TextInput
          value={this.state.description}
          placeholder="Project Description"
          onChangeText = {(value) => this.setState({description:value})}
        />
        <TextInput
          value={this.state.leader}
          placeholder="Project Leader"
          onChangeText = {(value) => this.setState({leader:value})}
        />
        <TextInput
          value={this.state.due}
          placeholder="Project Due"
          onChangeText = {(value) => this.setState({due:value})}
        />
        <View style={styles.submit}>
        <Button
          title="Submit"
          style={styles.btn}
          onPress={this.onSubmit.bind(this)}
          color="black"
        />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addForm: {
    backgroundColor:'#b0d4ff',
    padding:20
  }
});

AppRegistry.registerComponent('EditForm', () => EditForm);
