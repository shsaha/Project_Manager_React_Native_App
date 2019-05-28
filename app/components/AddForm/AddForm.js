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

export default class AddForm extends Component {
  constructor(){
    super();
    this.state = {
      id:'',
      name:'',
      category:'',
      description:'',
      leader:'',
      due:'',
      projects:[]
    }
  }

  componentDidMount(){
    this.getProjects();
    this.generateId();
  }

  getProjects(){
    AsyncStorage.getItem('projects').then((value) => {
      console.log(value);
      if(value != undefined){
        this.setState({projects: JSON.parse(value)});
      }
    });
  }
rr
  generateId(){
    let id = Math.floor(Math.random() * 1000000000);
    this.setState({id});
  }

  onSubmit(){
    let projects = this.state.projects;

    projects.push({
      id: this.state.id,
      name: this.state.name,
      category:this.state.category,
      description:this.state.description,
      leader: this.state.leader,
      due: this.state.due
    });

    AsyncStorage.setItem('projects', JSON.stringify(projects));

    this.props.navigator.push({
      id:'projects'
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

AppRegistry.registerComponent('AddForm', () => AddForm);
