import React from 'react';
import { View, StyleSheet, Button, TextInput, Text } from 'react-native';
import { auth } from '../helpers/auth';


export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.SignUp = this.SignUp.bind(this);
    this.state = {
      response: '',
      email: '',
      password: '',
    };
  }
  
  static navigationOptions = {
    title: 'Registrate Chaval',
  };

  SignUp() {
    auth(this.state.email, this.state.password).catch((error) => {
      this.setState({ response: error.response });
    });
    this.setState({
      email: '',
      password: ''
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Email:</Text>
        <TextInput
          value={this.state.email}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={(text) => {this.setState({ email: text })}}
        />
        <Text>Password:</Text>
        <TextInput
          value={this.state.password}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {this.setState({ password: text })}}
        />
        <Button
          onPress={this.SignUp}
          title="Register"
        />
        <Text>{this.state.response}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
