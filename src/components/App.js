import { dbService, serviceAuth } from "fbase";
import React,{useState,useEffect} from "react";
import AppRouter from "components/Router";


function App() {
  const [userObj, setUserObj] = useState(null);
  const [isInit, setIsInit] = useState(false);

  useEffect(
    () => {
      serviceAuth.onAuthStateChanged(
        (user) => {
          if(user){
            getUser(user).then(
              (result) => {
                setUserObj(result);
              }
            ).catch((error) => {
              console.log(error);
            });
          } 
          setIsInit(true);
        });
    } , []
  );

  const getUser = async (user) => {
    const users = await dbService.collection("users").where("creatorId", "==", user.uid).get();
    const userObj = users.docs.map(
      (doc) => ({
        id : doc.id,
        ...doc.data(),
      })
    ); 
    return userObj[0];
  }

  return (
    <>
      {isInit ? <AppRouter isLoggIn={Boolean(userObj)} userObj={userObj}  /> : "Initializing"}
    </>
  );
}

export default App;
