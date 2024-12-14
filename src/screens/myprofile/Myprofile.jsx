import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { db, auth } from '../../firebase'; // Ensure Firestore and Auth are correctly imported
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './myprofile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    photoURL: '',
    coverpic: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, 'user', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfile({
            name: userData.displayName,
            bio: userData.bio,
            photoURL: userData.photoURL,
            coverpic: userData.coverpic,
          });
        } else {
          console.log('No such document!');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className='pimgdiv'>
        <Link to={"/home"}><div className='arrow'><FaArrowLeftLong size={20} color='white' /></div></Link>
        <img className='profileimg' src={profile.coverpic || "/img/profilebg.png"} alt="profile" />
      </div>
      <div className='pinfo'>
        <div className='profiledp'>
          <img className='gprofiledp' src={profile.photoURL || "/img/default_dp.png"} alt="dp" />
        </div>
        <div className='namenbiobody'>
          <div className="Name">
            <div>Name</div>
            <div>{profile.name}</div>
          </div>
          <div className="Bio">
            <div>Bio</div>
            <div>{profile.bio}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
