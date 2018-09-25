import React, { Component } from 'react';
//import Typography from '@material-ui/core/Typography';
import {Text , View} from 'react-native'

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: props.author,
      text: props.text,
      uid: props.uid
    };
  }

  render() {
    return (
      <View >
        <Text>{this.state.author + ' posted:'}</Text>
        <Text>{this.state.text}</Text>
      </View>
    );
  }

}

