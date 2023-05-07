import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export const useUserSkills = (userId) => {
    const [userSkills, setUserSkills] = useState([]);

    useEffect(() => {
        const userRef = firestore().collection("users").doc(userId);
        const skillsRef = userRef.collection("skills");

        const unsubscribe = skillsRef.onSnapshot((snapshot) => {
            const skills = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserSkills(skills);
        });

        return unsubscribe;
    }, [userId]);

    return userSkills;
};
