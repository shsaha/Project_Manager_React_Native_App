import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Dimensions
} from 'react-native';

import Toolbar from './app/components/Toolbar/Toolbar';
import Projects from './app/components/Projects/Projects';
import AddBtn from './app/components/AddBtn/AddBtn';
import AddForm from './app/components/AddForm/AddForm';
import ProjectDetails from './app/components/ProjectDetails/ProjectDetails';
import EditForm from './app/components/EditForm/EditForm';

export default class projectmgr extends Component {
  renderScene(route, navigator){
    switch(route.id){
      case 'projects':
        return (
          <View style={styles.screen}>
            <Toolbar />
            <AddBtn navigator={navigator} />
            <Projects navigator={navigator} title="projects" />
          </View>
        )
        case 'add':
          return (
            <View style={styles.screen}>
              <Toolbar title="Add Project" />
              <AddForm navigator={navigator} title="add" />
            </View>
        )
        case 'details':
          return (
            <View style={styles.screen}>
              <Toolbar title={route.project.name} />
              <ProjectDetails navigator={navigator} project={route.project} title="details" />
            </View>
        )
        case 'edit':
          return (
            <View style={styles.screen}>
              <Toolbar title="Edit Project" />
              <EditForm navigator={navigator} project={route.project} title="edit" />
            </View>
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute = {{id: 'projects'}}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
      />
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor:'#0186a3',
    height:Dimensions.get('window').height
  }
});

AppRegistry.registerComponent('projectmgr', () => projectmgr);
