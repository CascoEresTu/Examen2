import React from 'react';
import { View, StyleSheet, Button, TextInput, Text, Picker } from 'react-native';
import firebase from '../config/constants';

export default class AddPostScreen extends React.Component {
    constructor(props) {
      super(props);
      this.UploadPost = this.UploadPost.bind(this);
      this.state = {
        currentUserInfo: {},
        title: '',
        body: '',
        privacy: ''
      };
    }
    static navigationOptions = {
        title: 'Quieres compartir algo?',
    };

      updatePrivacy = (privacy) => {
        this.setState({ privacy: privacy })
      }
    
      UploadPost() {
        // build the new post
        const newPost = {
          author: this.state.currentUserInfo.username,
          authorPic: this.state.currentUserInfo.profile_picture,
          body: this.state.body,
          likes: {},
          title: this.state.title,
          privacy: this.state.privacy.toLowerCase(),
          uid: this.state.currentUserInfo.uid,
          serverTime: 0
        };
    
        // push the new request
        this.dbRefPosts.push(newPost).then((snap) => {
          const key = snap.key;
          const path = `/user-posts/${this.state.currentUserInfo.uid}/${key}`;
          firebase.database().ref(path).set(newPost);
        });
    
        // reset form
        this.setState({
          title: '',
          body: '',
          privacy: ''
        });
      }
    
      render() {
        return (
          <View style={styles.container}>
            <Text>Titulo:</Text>
            <TextInput
              value={this.state.title}
              onChangeText={(text) => {this.setState({ title: text })}}
            />
            <Text>Que quieres compartir?</Text>
            
            <TextInput
              multiline={true}
              numberOfLines={4}
              value={this.state.body}
              onChangeText={(text) => {this.setState({ body: text })}}
            />

          <Text>Quien puede ver esto?:</Text>
          
          <Picker
            selectedValue={this.state.privacy}
            style={{ height: 50, width: 100 }}
            onValueChange={this.updatePrivacy}>
            <Picker.Item label="Publico" value="0" />
            <Picker.Item label="Privado" value="1" />
            <Picker.Item label="Amigos" value="2" />

          </Picker>

            <Button
              onPress={this.UploadPost}
              title="Make new post"
            />
          </View>
        );
      }
    
      setUser(user) {
        // if user not in db: add him
        firebase.database().ref('/users/' + user.uid).on('value', (snap) => {
          if (!snap.val()) {
            firebase.database().ref('/users/' + user.uid).set({
              email: user.email,
              profile_picture: user.photoURL ? user.photoURL : 'http://gifimage.net/wp-content/uploads/2017/09/banana-man-gif-1.gif',
              username: user.displayName
            });
          }
        });
    
        // add user info to state
        this.setState({ currentUserInfo: {
          uid: user.uid,
          email: user.email,
          profile_picture: user.profile_picture ? user.profile_picture : 'http://gifimage.net/wp-content/uploads/2017/09/banana-man-gif-1.gif',
          username: user.displayName ? user.displayName : user.email
        } });
      }
    
      componentDidMount() {
        var user = firebase.auth().currentUserInfo;
        if (user) {
          this.setUser(user);
        }
        // posts ref
        this.dbRefPosts = firebase.database().ref('/posts-requests');
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingTop: 15,
        //backgroundColor: '#fff',
      },
    });