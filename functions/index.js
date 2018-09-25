const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.Moderator = functions.database.ref('/posts/{pushId}/')
.onCreate((snap, context) => {
  const filter = ['imbecil', 'idiota','autista', 'estupido', 'puta', 'puto', 'energumeno', 'pija', 'pijota', 'cabron', 'verga','pinga','culo','carenalga','maje'];

  const oldBody = snap.val().body;
  var newBody = snap.val().body;

  for (let i = 0; i < filter.length; i++) {
    regex = new RegExp(filter[i], 'gi');
    newBody = newBody.replace(regex, '#'.repeat(filter[i].length));
  }
  console.log('Censurando tus palabrotas.. >:c', oldBody, '|', newBody);
  return snap.ref.child('body').set(newBody);
});


exports.setDate = functions.database.ref('/posts/{postId}/serverTime')
.onCreate((snap, context) => {
  const postId = context.params.postId;
  const time = Date.now();
  console.log('Setting server time on post', postId, time);
  return snap.ref.parent.child('serverTime').set(time);
});



exports.getPosts = functions.https.onRequest((request, response) => {
    const privacy = request.query.privacy;
    const uid = request.query.uid;
  
    if (privacy === '0') {
     
      var public_posts = {};
      admin.database().ref('/posts/').once('value', (snap) => {
        const allPosts = snap.val();
  
        for (let key in allPosts) {
          if (allPosts[key].privacy === '0') {
            public_posts[key] = allPosts[key];
          }
        }
        response.send(public_posts);
      });
  
    } else if (privacy === '1') {
      var private_posts = {};
  
      admin.database().ref('/posts/').once('value', (snap) => {
        const allPosts = snap.val();
        
        for (let key in allPosts)
          if (allPosts[key].privacy === '1' && allPosts[key].uid === uid) {
            private_posts[key] = allPosts[key];
          }
        response.send(private_posts);
      });
  
    } else if (privacy === '2') {
      console.log('Getting follower posts...');
      var friend_posts = {};
      var peopleImFollowing = [];
  
      admin.database().ref('/followers/').once('value', (snap) => {
        const allFollowers = snap.val();
  
        for (let followed in allFollowers) {
          for (let follower in allFollowers[followed]) {
            if (follower === uid && allFollowers[followed][uid] === true) {
              peopleImFollowing.push(followed);
            }
          }
        }
      });
  
      admin.database().ref('/posts/').once('value', (snap) => {
        const allPosts = snap.val();
        let friend_post;
  
        for (let key in allPosts) {
          friend_post = allPosts[key];
          if (post.privacy === '1')
            continue;
  
          if (peopleImFollowing.includes(post.uid))
            friend_posts[key] = friend_post;
        }
        response.send(friend_posts);
      });
  
    } else {
      response.send('Error completing your query!');
    }
  });