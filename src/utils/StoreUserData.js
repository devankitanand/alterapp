// StoreUserData.js
import { useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const storeUserData = async (user) => {
  if (user) {
    try {
      await setDoc(doc(db, 'user', user.uid), {
        displayName: user.displayName,
        photoURL: user.photoURL,
        bio: 'bio',
        coverpic: 'https://firebasestorage.googleapis.com/v0/b/alterapp-cc140.firebasestorage.app/o/profilebg.png?alt=media&token=b4f45956-9cb4-4207-aad5-70cda3189',
      });
      console.log('User data saved successfully');
    } catch (error) {
      console.error('Error saving user data: ', error);
    }
  }else{
    console.log('no User data saved ');
  }
};

const UserProfile = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        storeUserData(user);
      }
    });

    return () => unsubscribe();
  }, []);

  return null; 
};

export default UserProfile;
