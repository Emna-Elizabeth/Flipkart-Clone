const firebaseConfig = {
    apiKey: "AIzaSyCbX8RTS7jKJ0xApi1s3c3TS7_iExa-BjA",
    authDomain: "fc-clone-13fe6.firebaseapp.com",
    databaseURL: "https://fc-clone-13fe6-default-rtdb.firebaseio.com",
    projectId: "fc-clone-13fe6",
    storageBucket: "fc-clone-13fe6.appspot.com",
    messagingSenderId: "1003116691829",
    appId: "1:1003116691829:web:212b427550a54b7ed0d33c"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

let EmailInp = document.getElementById('emailInp');
let PassInp = document.getElementById('passwordInp');
let MainForm = document.getElementById('MainForm');

let RegisterUser = evt => {
    evt.preventDefault();

    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            return auth.createUserWithEmailAndPassword(EmailInp.value, PassInp.value);
        })
        .then((credentials) => {
            console.log("User created successfully:", credentials);
            
            const userId = credentials.user.uid;
            return db.ref('UsersAuthList/' + userId).set({
                email: EmailInp.value,
                password: PassInp.value // Note: Storing password in plain text is insecure.
            });
        })
        .then(() => {
            console.log("User data stored successfully.");
            window.location.href = "../html/LoginPage.html";
        })
        .catch((error) => {
            console.error("Error: ", error);
            alert(error.message);
        });
}

MainForm.addEventListener('submit', RegisterUser);