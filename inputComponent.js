import React, {Component} from 'react';
import {View, Image, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
export default class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }
  render(){
    const { onItemAdd, Name } = this.props;
    const Add = () => {
      return(
        <TouchableOpacity
          onPress={() => {
            onItemAdd(Name, this.state.text)
            this.setState({text:''})
            }
          }
        >
          <Image
            source={require('./icons/add.png')}
          />
        </TouchableOpacity>
      )
    }
    return (
      <View style={inputStyles.headerRow}>
        <TextInput
          style={inputStyles.textInput}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Enter a new item"
        />
        <Add />
      </View>
    );
  }
}

const inputStyles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    height:50,
    width:'100%',
    paddingLeft:10,
    paddingRight:10,
    alignContent:'center',
    justifyContent:'space-between',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '75%',
    backgroundColor:'white',
    padding:5,
  }
})
