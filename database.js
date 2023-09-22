const admin = require("firebase-admin");

const serviceAccount = require("./service_key.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
  });



function getDataBase(){
    return admin.firestore()
}

module.exports = getDataBase



/*var admin = require("firebase-admin");

const serviceAccount;

if(process.env.PRIVATE_KEY){
   serviceAccount = JSON.parse(process.env.PRIVATE_KEY)
}
else{

   serviceAccount = require("./firebase-private-key.json");
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



function getDataBase(){
    return admin.firestore()
}

module.exports = getDataBase;*/