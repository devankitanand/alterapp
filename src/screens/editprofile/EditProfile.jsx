import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { db, auth, storage } from '../../firebase'; 
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import './editprofile.css';

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({
        name: '',
        bio: '',
        photoURL: '',
        coverpic: '',
    });
    const [newName, setNewName] = useState('');
    const [newBio, setNewBio] = useState('');
    const [newCoverpic, setNewCoverpic] = useState(null);
    const [newDp, setNewDp] = useState(null);
    
    const coverpicInputRef = useRef(null);
    const dpInputRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDoc = await getDoc(doc(db, 'user', currentUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log('User data:', userData); // Log user data to debug
                    setProfile({
                        name: userData.displayName,
                        bio: userData.bio,
                        photoURL: userData.photoURL,
                        coverpic: userData.coverpic,
                    });
                    setNewName(userData.displayName);
                    setNewBio(userData.bio);
                } else {
                    console.log('No such document!');
                }
            }
        });

        return () => unsubscribe();
    }, []);

    const handleFileChange = (e, setFile) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDivClick = (ref) => {
        ref.current.click();
    };

    const handleSave = async () => {
        let updatedCoverpic = profile.coverpic;
        let updatedDp = profile.photoURL;

        // Upload new cover pic if available
        if (newCoverpic) {
            const coverpicRef = ref(storage, `coverpics/${user.uid}/${newCoverpic.name}`);
            await uploadBytes(coverpicRef, newCoverpic);
            updatedCoverpic = await getDownloadURL(coverpicRef);
        }

        // Upload new dp if available
        if (newDp) {
            const dpRef = ref(storage, `profilepics/${user.uid}/${newDp.name}`);
            await uploadBytes(dpRef, newDp);
            updatedDp = await getDownloadURL(dpRef);
        }

        // Update user document in Firestore
        await setDoc(doc(db, 'user', user.uid), {
            displayName: newName,
            bio: newBio,
            photoURL: updatedDp,
            coverpic: updatedCoverpic,
        }, { merge: true });

        // Optionally update local profile state
        setProfile(prevProfile => ({
            ...prevProfile,
            name: newName,
            bio: newBio,
            photoURL: updatedDp,
            coverpic: updatedCoverpic,
        }));

        alert('Profile updated successfully!');
    };

    return (
        <div>
            <div className='pimgdiv'>
                <Link to={"/profile"}><div className='arrow'><FaArrowLeftLong size={20} color='white' /></div></Link>
                <img className='profileimg' src={profile.coverpic || "/img/profilebg.png"} alt="profile" />
                <div className="editcover" onClick={() => handleDivClick(coverpicInputRef)}>
                    <MdEdit />
                </div>
                <input 
                    type="file" 
                    ref={coverpicInputRef} 
                    onChange={(e) => handleFileChange(e, setNewCoverpic)} 
                    style={{ display: 'none' }} 
                />
            </div>
            <div className='pinfo'>
                <div className='pinfocontainer'>
                    <div className='profiledp editdpcircle'>
                        <img className='gprofiledp' src={profile.photoURL || "/img/default_dp.png"} alt="dp" />
                        <div className="editcover editdpbtn" onClick={() => handleDivClick(dpInputRef)}>
                            <MdEdit />
                        </div>
                        <input 
                            type="file" 
                            ref={dpInputRef} 
                            onChange={(e) => handleFileChange(e, setNewDp)} 
                            style={{ display: 'none' }} 
                        />
                    </div>
                </div>
                <div className='namenbiobody'>
                    <div className="Nameedit">
                        <div>Name</div>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="nameinput"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="bioedit">
                        <div>Bio</div>
                        <div>
                            <input
                                type="text"
                                placeholder="Enter bio"
                                className="nameinput"
                                value={newBio}
                                onChange={(e) => setNewBio(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <button type="button" onClick={handleSave} className="save">SAVE</button>
            </div>
        </div>
    );
};

export default EditProfile;
