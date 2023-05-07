// import { useEffect, useState } from "react";
// import firestore from "@react-native-firebase/firestore";

// export function useUser() {
//     const [user, setUser] = useState(null);
//     const userId = auth().currentUser.uid;

//     useEffect(() => {
//         const userRef = firestore().collection("users").doc(userId);
//         const skillsRef = userRef.collection("skills");
//         const projectRef = userRef.collection("projects");

//         // listen for updates to the user document
//         const unsubscribe = userRef.onSnapshot((documentSnapshot) => {
//             const userData = documentSnapshot.data();
//             setUser(userData);
//         });

//         return unsubscribe;
//     }, [userId]);

//     return user;
// }

import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const useUser = () => {
    const [user, setUser] = useState(null);
    const userId = auth().currentUser.uid;

    useEffect(() => {
        const userRef = firestore().collection("users").doc(userId);
        const projectsRef = userRef.collection("projects");
        const skillsRef = userRef.collection("skills");

        const unsubscribeUser = userRef.onSnapshot(async (userSnapshot) => {
            const userData = userSnapshot.data();
            const projectsSnapshot = await projectsRef.get();
            const projectsData = projectsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const skillsSnapshot = await skillsRef.get();
            const skillsData = skillsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUser({
                ...userData,
                projects: projectsData,
                skills: skillsData,
            });
        });

        return () => {
            unsubscribeUser();
        };
    }, [userId]);

    return user;
};
