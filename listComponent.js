import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Switch, TouchableOpacity, Image} from 'react-native';
import InputComponent from './inputComponent.js';

const Item = (item, onItemComplete, onItemDelete, listName) => {
  let completeImage = require('./icons/complete.png')
  if (item.complete === false) {
    completeImage = require('./icons/uncomplete.png')
  }
  const Buttons = () => (
      <View style={listStyles.itemButtons}>
        <TouchableOpacity onPress={() => onItemComplete({listName, item})}>
          <Image source={completeImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onItemDelete({listName, item})}>
          <Image source={require('./icons/delete.png')} />
        </TouchableOpacity>
      </View>
  )
  return (
    <View >
      <View style={listStyles.item} >
        <Text style={listStyles.itemText}>{item.key}</Text>
        <Buttons />
      </View>
      <FlatListItemSeparator />
    </View>
  );
}

const FlatListItemSeparator = () => {
  return (
    <View style={{ height: 1, width: "100%", backgroundColor: "gray" }} />
  );
};

export default class List extends Component{
  constructor(props) {
    super(props)
    this.state = {
      enabled: true,
      text: '',
    }
  }
  render(){
    const { onItemComplete, onItemDelete, onItemAdd, Name, listKey, onListDelete } = this.props;
    const Tasks = Object.values(this.props.Tasks)
    let table = <View />
    let headerRow = <View />
    if(this.state.enabled) {
      table = <FlatList
                data={Tasks}
                renderItem={({item}) => Item(item, onItemComplete, onItemDelete, Name)}
                style={listStyles.list}
              />
      headerRow = <InputComponent onItemAdd={onItemAdd} Name={Name} />
    }
    const toggleSwitch = (value) => {
      this.setState({enabled: value})
    }
    return (
      <View style={listStyles.listComponent}>
        <View style={listStyles.headerRow}>
          <Switch style={listStyles.switch}
            onValueChange={toggleSwitch}
            value={this.state.enabled}
            ios_backgroundColor="lightgray"
          />
          <Text style={listStyles.listTitle}>{Name}</Text>
          <TouchableOpacity onPress={() => onListDelete({Name, listKey})} >
            <Image source={require('./icons/delete.png')} />
          </TouchableOpacity>
        </View>
        {headerRow}
        {table}
      </View>
    )
  }
}

const listStyles = StyleSheet.create({
  listComponent: {
    alignSelf:'center',
    width: '95%',
    height: 'auto',
    marginBottom: 15,
    paddingTop:10,
    backgroundColor: '#067BC2',
    alignItems: 'center',
    borderRadius: 10,
  },
    headerRow: {
      flexDirection: 'row',
      height:50,
      width:'100%',
      paddingLeft:10,
      paddingRight:10,
      alignContent:'center',
      justifyContent:'space-between',
    },
      listTitle: {
        fontSize: 25,
        color: '#FBFEF9',
      },
    list: {
      width:'100%',
      backgroundColor:'#FBFEF9',
      borderBottomLeftRadius:10,
      borderBottomRightRadius:10,
    },
    item: {
      flexDirection:'row',
      height: 45,
      padding:10,
      alignContent:'center',
      justifyContent:'space-between',
    },
      itemText: {
        fontSize:20,
      },
      itemButtons: {
        alignContent:'center',
        justifyContent:'center',
        flexDirection:'row',
        flexWrap:'nowrap',
        width:75,
        height:'100%',
      }
});
