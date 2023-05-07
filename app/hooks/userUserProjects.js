import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const useUserProjects = () => {
    const [userProjects, setUserProjects] = useState([]);
    const userId = auth().currentUser.uid;

    useEffect(() => {
        const userRef = firestore().collection("users").doc(userId);
        const projectsRef = userRef.collection("project");

        const unsubscribe = projectsRef.onSnapshot((snapshot) => {
            const projects = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserProjects(projects);
        });

        return unsubscribe;
    }, [userId]);

    return userProjects;
};
