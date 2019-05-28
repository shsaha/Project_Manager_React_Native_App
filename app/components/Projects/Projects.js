import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

export default class Projects extends Component {
  constructor(){
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
    this.state = {
      projDataSource: ds
    }

    this.renderRow = this.renderRow.bind(this);
  }

  componentWillMount(){
    this.getProjects()
  }

  componentDidMount(){
    this.getProjects()
  }

  getProjects(){
    /*
    let projects = [
      {
        id:1,
        name: 'Project One',
        category: 'Mobile App',
        description: 'Awesome React Native application',
        leader: 'John Doe',
        due: '07-01-2017'
      },
      {
        id:2,
        name: 'Project Two',
        category: 'Web App',
        description: 'Cool Ruby on rails application',
        leader: 'Kevin Smith',
        due: '09-01-2017'
      },
      {
        id:3,
        name: 'Project Three',
        category: 'Web App',
        description: 'Great Node.js application',
        leader: 'Sara Wilson',
        due: '010-01-2017'
      }
    ];
    */

    AsyncStorage.getItem('projects').then((value) => {
      if(value == undefined){
        console.log('No Projects');
      } else {
        let projects = JSON.parse(value);
        this.setState({
          projDataSource: this.state.projDataSource.cloneWithRows(projects)
        });
      }
    });
  }

  pressRow(project){
    this.props.navigator.push({
      id:'details',
      project: project
    });
  }

  renderRow(project){
    return (
      <TouchableHighlight onPress={() => {
        this.pressRow(project);
      }}>
        <View style={styles.row}>
          <Text style={styles.text}>{project.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.projDataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection:'row',
    justifyContent: 'center',
    padding:12,
    backgroundColor:'#b0d4ff',
    marginBottom: 3
  },
  text: {
    flex:1
  }
});

AppRegistry.registerComponent('Projects', () => Projects);
