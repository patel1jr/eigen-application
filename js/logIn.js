(function(){
   
document.getElementById('errMessage').innerHTML='';
const btnLogin=document.getElementById('btnLogin');
const btnSignUp=document.getElementById('btnSignup');

//add login click event
btnLogin.addEventListener('click',signIn);

//add signup click event
btnSignUp.addEventListener('click',signUp);
}());

var isUserSigningUp=false;
var database,ref,email,pass;

function signIn()
{
  document.getElementById('errMessage').innerHTML='';
       if(isUserSigningUp)
       {
            email=document.getElementById('txtEmailSignUp').value;
            pass=document.getElementById('txtPasswordSignUp').value;
       }
       else
       {
       //get email and password
            email=document.getElementById('txtEmailSignIn').value;
            pass=document.getElementById('txtPasswordSignIn').value;         
       }
       const auth=firebase.auth();
       //sign in
       auth.signInWithEmailAndPassword(email,pass).then(function(result) {
             window.location = 'Regions.html'; 
       }).catch(function(error) {
         document.getElementById('errMessage').innerHTML=error.message;
  });      
}

function signUp()
{
  document.getElementById('errMessage').innerHTML='';
        //get email and password
        email=document.getElementById('txtEmailSignUp').value;
        pass=document.getElementById('txtPasswordSignUp').value;
        const auth=firebase.auth();

        //sign up
        auth.createUserWithEmailAndPassword(email,pass).then(function(result) {
        //console.log("adding user");
        
        const fName=document.getElementById('txtFName').value;
        const lName=document.getElementById('txtLName').value;

        var database=firebase.database();
        var ref=database.ref(result.uid);
        ref.set({firstName :fName,lastName:lName});
    
        isUserSigningUp=true;
        signIn();

        }).catch(function(error) {      
        document.getElementById('errMessage').innerHTML=error.message;
        });        
}