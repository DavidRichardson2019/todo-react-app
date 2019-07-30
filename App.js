import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, FlatList, Switch, Alert, AlertIOS} from 'react-native';
import List from './listComponent.js';

const GetLists = (props) => {
  let lists = [];
  let key = 0;
  const { data, onListDelete, onItemAdd, onItemComplete, onItemDelete } = props;
  for (listItem of data){
    lists.push(<List Name={listItem.name} Tasks={listItem.tasks} key={listItem.key} listKey={key} onListDelete={onListDelete} onItemAdd={onItemAdd} onItemComplete={onItemComplete} onItemDelete={onItemDelete}/>)
    key++;
  }
  return lists;
}

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      listsData: {
        'List One': {
          name: 'List One',
          tasks: {
            'Create List': {
              key: 'Create List',
              complete:false,
            },
            'Edit List': {
              key: 'Edit List',
              complete:false,
            },
            'Add New List': {
              key: 'Add New List',
              complete:false,
            },
            'Remove List': {
              key: 'Remove List',
              complete:true,
            },
          },
          key: 0,
        },
        'List Two': {
          name: 'List Two',
          tasks: {
            'Create List': {
              key: 'Create List',
              complete:false,
            },
            'Edit List': {
              key: 'Edit List',
              complete:false,
            },
            'Add New List': {
              key: 'Add New List',
              complete:false,
            },
            'Remove List': {
              key: 'Remove List',
              complete:false,
            },
          },
          key: 1,
        },
        'List Three': {
          name: 'List Three',
          tasks: {
            'Create List': {
              key: 'Create List',
              complete:false,
            },
            'Edit List': {
              key: 'Edit List',
              complete:false,
            },
            'Add New List': {
              key: 'Add New List',
              complete:false,
            },
            'Remove List': {
              key: 'Remove List',
              complete:false,
            },
          },
          key: 2,
        },
        'List Four': {
          name: 'List Four',
          tasks: {
            'Create List': {
              key: 'Create List',
              complete:false,
            },
            'Edit List': {
              key: 'Edit List',
              complete:false,
            },
            'Add New List': {
              key: 'Add New List',
              complete:false,
            },
            'Remove List': {
              key: 'Remove List',
              complete:false,
            },
          },
          key: 3,
        },
      }
    }
  }
  render() {
    const deleteList = ({Name}) => {
      Alert.alert(
        'Delete ' + Name,
        'Are you sure you want to delete ' + Name + '?',
        [
          {text: 'Delete', onPress: () => {
            const data = this.state.listsData
            delete data[Name]
            this.setState({listsData: data})
          }},
          {text:'Cancel', style:'cancel'}
        ],
        {cancelable: false},
      );
    }
    const addList = () => {
      alert('add list')
    }
    const addItem = (listName, text) => {
      let tempState = this.state
      const newItem = {key:text, complete: false}
      tempState.listsData[listName].tasks[text] = newItem
      this.setState(tempState)
    }
    const deleteItem = ({listName, item}) => {
      const itemName = item.key
      let tempState = this.state
      delete tempState.listsData[listName].tasks[itemName]
      this.setState(tempState)
    }
    const toggleComplete = ({listName, item}) => {
      const itemName = item.key
      let tempState = this.state
      tempState.listsData[listName].tasks[itemName].complete = !tempState.listsData[listName].tasks[itemName].complete
      this.setState({tempState})
    }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Todo App</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <GetLists data={Object.values(this.state.listsData)} onListDelete={deleteList} onItemAdd={addItem} onItemComplete={toggleComplete} onItemDelete={deleteItem}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#84BCDA',
  },
  header: {
    flexDirection:'row',
    width:'100%',
    height: 175,
    backgroundColor: '#A63446',
    color: 'white',
    justifyContent:'center',
  },
    headerText: {
      fontSize:55,
      color: '#FBFEF9',
      alignSelf:'center',
    },
  scrollView: {
    width: '100%',
    paddingTop:15,
  },
});
