import React, { useEffect, useState } from "react";
import { firestore, auth } from "../../firebase/firebase.utils";
import { Ring } from "react-spinners-css";

const Frequencia = () => {
  const [activitiesUser, setActivitiesUser] = useState([]);
  const [userState, setUserState] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserActivities = async () => {
      setLoading(true);

      const snapshot = await firestore
        .doc("activities/DPmp9gpFtb69cNqEt3mt")
        .get();

      //console.log(snapshot.data()); //não funciona, somente com o observer
      setActivitiesUser(snapshot.data());
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUserState(userAuth.uid);
        loadUserActivities();
        //alert(currentUser);
        //console.log(userState);
      } else {
        setUserState(null);
        //alert(currentUser);
        // console.log(userState);
      }
    });

    return () => unsubscribe();
    //return () => console.log("useEffect End");
  }, [userState]);

  const {titulo, attendance} = activitiesUser;

  return (
    <div>
      <div className="cards">
        <div className="titulo">{titulo}</div>
        
        <div>{attendance}</div>
      </div>
    </div>
  );
};

export default Frequencia;