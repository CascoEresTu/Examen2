import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { login } from '../helpers/auth';
//import * as firebase from "firebase";
import firebase from '../config/constants';

export default class LogScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      currentUserInfo: {},
      response: '',
      email: '',
      password: '',
    }
    
    this.handleLogin = this.handleLogin.bind(this);
    //this.SignUpFunction = this.SignUpFunction.bind(this);
   // this.LogInFunciton = this.LogInFunciton.bind(this);
}

static navigationOptions = {
  title: 'Accede por Aqui',

};
   
 
 /* renderIsLogged(){
    return( 
    <View>
        <Button
           title = 'Salir'
           onPress = {()=> this.logout()}
        />        
     </View>
     )
     
  } */
  
  //Viejo RenderIsNotLogged
  render(){
    
    return ( 
      <View style={Styles.container}>
        <Text>Login</Text>
      
        <TextInput
          style={Styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={Styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" 
        onPress={() => this.handleLogin} 
        />
        <Text>{this.state.response}</Text>
        
        <Text>
          Has entrado  : {this.state.currentUserInfo.uid ? this.state.currentUserInfo.uid : 'INTRUSO , DEBES REGISTRARTE'}
        </Text>
        
        <Button
          title="Eres nuevo? Registrate"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
      </View>
    )
  }

  /*  
  render() {
    if (this.state.auth || user){
      return (this.renderIsLogged());
    }
    else if (!user){
      return (this.renderIsNotLogged());
    }
    
  }
*/

  handleLogin() {
    login(this.state.email, this.state.password).then((response) => {
      if (response.user) {
        this.setState({ response: 'Logged in succesfully!' });
      }
    }).catch((error) => {
      this.setState({ response: error.response });
    });
  
    var user = firebase.auth().currentUserInfo;
    if (user) {
      this.setState({
        currentUserInfo: {
          uid: user.uid,
          email: user.email,
          profile_picture: user.photoURL,
          username: user.displayName ? user.displayName : user.email
        },
        email: '',
        password: ''
      });
    }
  }
  
  setUser(user) {
    // if user not in db: add him
    firebase.database().ref('/users/' + user.uid).on('value', (snap) => {
      if (!snap.val()) {
        firebase.database().ref('/users/' + user.uid).set({
          email: user.email,
          profile_picture: user.photoURL ? use.photoURL : 'http://gifimage.net/wp-content/uploads/2017/09/banana-man-gif-1.gif',
          username: user.displayName
        });
      }
    });

    // add user info to state
    this.setState({ currentUserInfo: {
      uid: user.uid,
      email: user.email,
      profile_picture: user.profile_picture ? user.profile_picture : 'http://gifimage.net/wp-content/uploads/2017/09/banana-man-gif-1.gif',
      username: user.displayName
    } });
  }
  
  componentDidMount() {
    var user = firebase.auth().currentUserInfo;
    if (user) {
      this.setUser(user);
    }
  }
}



const Styles = StyleSheet.create({
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