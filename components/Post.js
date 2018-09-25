import React, { Component } from 'react';
import { Image, Text, View, Button, TextInput, StyleSheet } from 'react-native';
import firebase from '../config/constants';
import Comment from './Comment';


class Post extends Component {

    constructor(props) {
        super(props)
        this.LikeHandler = this.LikeHandler.bind(this);
        this.CommentHandler = this.CommentHandler.bind(this);
        this.FollowerHandler = this.FollowerHandler.bind(this);
        this.isFollowed = this.isFollowed.bind(this);

        this.state = {
            currentUser: props.currentUser,
            key: props.postid,
            author: props.author,
            authorPic: props.authorPic,
            privacy: props.privacy,
            title: props.title,
            body: props.body,
            Likes: props.Likes,
            followers: {},
            //following: {},
            comments: {},
            draft: ''
        };
    }

    LikeHandler(event) {
        var likeContainer = {};

        var dbRef = firebase.database().ref('/posts/' + this.state.key);

        var updates = {
            author: this.state.author,
            authorPic: this.state.authorPic,
            body: this.state.body,
            privacy: this.state.privacy,
            title: this.state.title,
            uid: this.state.currentUser.uid
        }

        if (!this.state.Likes) {
            // sin likes
            likeContainer[this.state.currentUser.uid] = true;
        } else if (!(this.state.Likes[this.state.currentUser.uid])) {
            // likes de otros, pero no del user actual
            likeContainer[this.state.currentUser.uid] = true;
        } else {
            // user da like 
            likeContainer[this.state.currentUser.uid] = !this.state.Likes[this.state.currentUser.uid];
        }
        // actualizacion de DB
        updates.Likes = likeContainer;
        dbRef.update(updates);
        this.setState({ Likes: likeContainer });
    }

    LikeCount() {
        var count = 0;
        for (let key in this.state.Likes) {
            if (this.state.Likes[key]) {
                count += 1;
            }
        }
        return count;
    }

    CommentHandler(event) {
        var updatedComments = this.state.comments || {};

        const newComment = {
            author: this.state.currentUser.username,
            text: this.state.draft,
            uid: this.state.currentUser.uid
        };

        this.dbRefComments.push(newComment).then((snap) => {
            const key = snap.key;
            updatedComments[key] = newComment;
            this.setState(updatedComments);
            this.setState({ draft: '' });
        });
    }

    userIsLogged() {
        return Object.keys(this.state.currentUser).length !== 0
          || this.state.currentUser.constructor !== Object;
      }

    FollowerHandler(event) {
        var followsYou = {};
        var dbRefFollowers = firebase.database().ref('/posts/' + this.state.key);

        if (!this.state.followers) {
            followsYou[this.state.currentUser.uid] = true;
        } else if (!(this.state.followers[this.state.currentUser.uid])) {
            followsYou = this.state.followers;
            followsYou[this.state.currentUser.uid] = true;
        } else {
            followsYou = this.state.followers;
            followsYou[this.state.currentUser.uid] = !this.state.followers[this.state.currentUser.uid];
        }
        dbRefFollowers.update(followsYou);
        this.setState({ followers: followsYou });

    }

    isFollowed() {
        if (this.state.followers
            && this.state.currentUser.uid in this.state.followers
            && this.state.followers[this.state.currentUser.uid] === true) {

            return 'Dejar de Seguir';
        } else {
            return 'seguir';
        }
    }

    renderCommentTextInput(){
        if (this.userIsLogged()) {
            return (
             //this.renderCommentIsLogged
             <View>
              <Text component="p">
                Escribe tu comentario aqui:
              </Text>
              <TextInput
                value={this.state.Draft}
                onChangeText={(text) => this.setState({ Draft: text })}
              />
            </View>
            );
          } else {
            return (
              //this.renderCommentNotLogged
              <View></View>
        
            );
          }
    }

    renderCommentIsLogged(){
        return (
            <View>
              <Text component="p">
                Escribe tu comentario aqui:
              </Text>
              <TextInput
                value={this.state.Draft}
                onChangeText={(text) => this.setState({ Draft: text })}
              />
            </View>
        )
    }
    renderCommentNotLogged(){
        return (
            <View>
                Debes ingresar para poder comentar!!
            </View>
          ); 
    }
    renderButtons(){
        if (this.userIsLogged()) {
            return (
              <View>
                <Button
                  onPress={this.handleComment}
                  title='Agregar Comentario'
                />
                <Button
                  onPress={this.handleFollow}
                  title={this.isFollowed()}
                />
              </View>
            );
          } else {
            return (
              <View></View>
            );
          }
    }

    renderPost(){
        return(
        <View>
            <View>
                <Image //style ={height='30' width:'30'} 
                source={{uri: this.state.authorPic ? this.state.authorPic : 'http://gifimage.net/wp-content/uploads/2017/09/banana-man-gif-1.gif'}}
                />
                <Text>{this.state.author}</Text>
                <Text>{'Likes: ' + (this.state.likes ? this.LikeCount : 0) }</Text>
            </View>

            <View>
                <Text>
                {this.state.title}
                </Text>
                <Text>
                {this.state.body}
                </Text>
                {comments}
                {this.renderCommentTextInput()}
            </View>
            {this.renderButtons()}
        </View>)
        
    }



    render() {
        var comments = [];
        for (let key in this.state.comments) {
            let comment = this.state.comments[key];
            comments.push(<Comment
                key={key}
                author={comment.author}
                text={comment.text}
                uid={comment.uid}
            />);
        }
        /*return (
            this.renderPost()
        );*/

        return(
            <View>
                <View>
                    <Image //style ={height='30' width:'30'} 
                    source={{uri: this.state.authorPic ? this.state.authorPic : 'http://gifimage.net/wp-content/uploads/2017/09/banana-man-gif-1.gif'}}
                    />
                    <Text>{this.state.author}</Text>
                    <Text>{'Likes: ' + (this.state.likes ? this.LikeCount : 0) }</Text>
                </View>
    
                <View>
                    <Text>
                    {this.state.title}
                    </Text>
                    <Text>
                    {this.state.body}
                    </Text>
                    {comments}
                    {this.renderCommentTextInput()}
                </View>
                {this.renderButtons()}
            </View>)
            




    }


    componentDidMount() {

        this.dbRefPost = firebase.database().ref('/posts/' + this.state.key);
        this.dbCallbackPost = this.dbRefPost.on('value', (snap) => {
            this.setState(snap.val());
        });


        this.dbRefUserPost = firebase.database().ref('/user-posts/' + this.state.key);
        this.dbCallbackUserPost = this.dbRefUserPost.on('value', (snap) => {
            this.setState(snap.val());
        });


        this.dbRefComments = firebase.database().ref('/comments/' + this.state.key);
        this.dbCallbackComments = this.dbRefComments.on('value', (snap) => {
            this.setState({ comments: snap.val() });
        });

        this.dbRefFollowers = firebase.database().ref('/followers/' + this.state.uid);
        this.dbCallbackFollowers = this.dbRefFollowers.on('value', (snap) => {
            this.setState({ followers: snap.val() });
        });


    }
/*
    componentWillUnmount() {
        this.dbRefPost.off('value', this.dbCallbackPost);
        this.dbRefUserPost.off('value', this.dbCallbackUserPost);
        this.dbRefFollowers.off('value', this.dbCallbackFollowers);
        this.dbRefComments.off('value', this.dbCallbackComments);

    }*/
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
      }, 
    Image: {
        width: 30,
        height: 30
    }
})



export default Post;