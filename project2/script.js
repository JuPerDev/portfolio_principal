
const firebaseConfig = {
  apiKey: "AIzaSyC7cMEql-K43URa8-bLPuAcJS8KoWt7LIM",
  authDomain: "formvalidate-529d7.firebaseapp.com",
  projectId: "formvalidate-529d7",
  storageBucket: "formvalidate-529d7.appspot.com",
  messagingSenderId: "51126425964",
  appId: "1:51126425964:web:260fd8eb9bf7f98dd73b49"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formCont').addEventListener('submit', (event) => {
    // Prevenir borrado de formulario
    event.preventDefault();


    // Validar Nombre
        let nameInput = document.getElementById('name');
        let errorName = document.getElementById('nameError');

        if(nameInput.value.trim() === ''){
            errorName.textContent = 'Introduzca su nombre!';
            errorName.classList.add('error-message');
        } else {
            errorName.textContent = '';
            errorName.classList.remove('error-message');
        }
    // Validar Email
        let emailInput = document.getElementById('email');
        let errorEmail = document.getElementById('emailError');
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailPattern.test(emailInput.value) ){
            errorEmail.textContent = 'Introduzca un email valido';
            errorEmail.classList.add('error-message');
        }else{
            errorEmail.textContent = '';
            errorEmail.classList.remove('error-message');
        }

    // Validar Contraseña
        let passInput = document.getElementById('password');
        let errorPass = document.getElementById('passwordError')
        let passPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/;
        
        if(!passPattern.test(passInput.value)){
            errorPass.textContent = 'Introduzca una contraseña valida 8 caracteres 1 mayus 1 caracter especial al menos'
            errorPass.classList.add('error-message');
        } else {
            errorPass.textContent = '';
            errorPass.classList.remove('error-message');
        }
    // Todo Correcto?
    if(!errorName.textContent && !errorEmail.textContent && !errorPass.textContent){

        // Backend recibe informacion

        db.collection("users").add({
            name: nameInput.value,
            email: emailInput.value,
            password: passInput.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        alert('El formulario se ha enviado con éxito');
        document.getElementById('formCont').reset();
        clearDiv();
        recollect();
    }
})

recollect();

function clearDiv(){
   while(container.firstChild)
        {   
            container.removeChild(container.firstChild);
        } 
}
function recollect(){
    const usersRef = db.collection('users');
    const showUsers = document.getElementById('showUsers')
    usersRef.get()
    .then(snapshot => {
        
       // Iterar sobre cada documento en el resultado de la consulta
        
       snapshot.forEach(doc => {
        // Obtener los datos de cada documento
        const userData = doc.data();
        const container = document.createElement('div')
        const paragraph = document.createElement('p');
        const eraseButton = document.createElement('button')
        eraseButton.classList = 'borrar'
        eraseButton.innerText = 'eliminar usuario'
        paragraph.innerText = userData.name;

        container.appendChild(paragraph)
        container.appendChild(eraseButton)

        showUsers.appendChild(container)
        });
    })
    .catch(error => {
        console.error('Error al obtener usuarios:', error);
    });
}