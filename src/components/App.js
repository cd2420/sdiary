import { dbService, serviceAuth } from "fbase";
import React,{useState,useEffect} from "react";
import AppRouter from "components/Router";
import Navigation from "./Navigation";
import PhoneAuthProvide from "./PhoneAuthProvide";


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
                const checkObj = checkObjfun(result);
                setUserObj({
                  ...result,
                  checkObj
                });
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

  const refreshUser = () => {
    const user = serviceAuth.currentUser;
    getUser(user).then(
      (result) => {
        const checkObj = checkObjfun(result);
        setUserObj({
          ...result,
          checkObj
        });
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  const checkObjfun = (userObj) => {
    if(Boolean(userObj.position) && Boolean(userObj.sector) && Boolean(userObj.username)){
       return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {isInit ? (
         Boolean(userObj) ? <Navigation userObj={userObj} refreshUser={refreshUser} /> : <PhoneAuthProvide /> 
      )  : "Initializing"}
    </>
  );
}

export default App;
