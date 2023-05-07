import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export function useUser() {
    const [user, setUser] = useState(null);
    const userId = auth().currentUser.uid;

    useEffect(() => {
        const userRef = firestore().collection("users").doc(userId);

        // listen for updates to the user document
        const unsubscribe = userRef.onSnapshot((documentSnapshot) => {
            const userData = documentSnapshot.data();
            setUser(userData);
        });

        return unsubscribe;
    }, [userId]);

    return user;
}
