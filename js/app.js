(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCUz11VIwgUQfLxsIKTX8GT4IHNGl4SY0U",
    authDomain: "trial-95b78.firebaseapp.com",
    databaseURL: "https://trial-95b78.firebaseio.com",
    storageBucket: "trial-95b78.appspot.com",
    messagingSenderId: "63963122654"
  };
  firebase.initializeApp(config);


//get elements
const txtEmail=document.getElementById('txtEmail');
const txtPassword=document.getElementById('txtPassword');
const btnLogin=document.getElementById('btnLogin');
const btnSignUp=document.getElementById('btnSignup');
//const btnLogout=document.getElementById('btnLogout');

//add login click event
btnLogin.addEventListener('click',e=>{
//get email end password
const email=txtEmail.value;
const pass=txtPassword.value;
const auth=firebase.auth();

//sign in
const promise=auth.signInWithEmailAndPassword(email,pass);
promise.catch(e => console.log(e.message));
});

//add signup click event
btnSignUp.addEventListener('click',e =>{
//get email end password
const email=txtEmail.value;
const pass=txtPassword.value;
const auth=firebase.auth();

//sign up
const promise=auth.createUserWithEmailAndPassword(email,pass);
promise.catch(e => console.log(e.message));

//sign in
promise=auth.signInWithEmailAndPassword(email,pass);
promise.catch(e => console.log(e.message));


//send verification email
/*var user = firebase.auth().currentUser;
//alert(user);
user.sendEmailVerification().then(function() {
  // Email sent.
}, function(error) {
  // An error happened.
});*/

});

//after signing in 
firebase.auth().onAuthStateChanged(firebaseUser => {
if(firebaseUser)
{
var name, uid;

if (firebaseUser != null) {
  name = firebaseUser.displayName;
  email = firebaseUser.email;
  uid = firebaseUser.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}
  alert(uid);
  window.location = 'index.html'; 
	console.log(firebaseUser);
}
else
{
console.log('not loggen in');
}
});


}());