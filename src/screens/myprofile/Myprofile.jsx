import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { db, auth } from '../../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Post from './components/Post';
import './myprofile.css';

const Myprofile = () => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState({
        name: '',
        bio: '',
        photoURL: '',
        coverpic: '',
    });
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDoc = await getDoc(doc(db, 'user', currentUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log('User data:', userData);
                    setProfile({
                        name: userData.displayName,
                        bio: userData.bio,
                        photoURL: userData.photoURL,
                        coverpic: userData.coverpic,
                    });

                    // Fetch user posts
                    const postsQuery = query(collection(db, 'posts'), where('createdBy', '==', currentUser.email));
                    const postsSnapshot = await getDocs(postsQuery);
                    const userPosts = postsSnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setPosts(userPosts);
                } else {
                    console.log('No such document!');
                }
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <div className='myprofilebody'>
            <div className='pimgdiv'>
                <Link to={"/home"}><div className='arrow'><FaArrowLeftLong size={20} color='white' /></div></Link>
                <img className='profileimg' src={ profile.coverpic || "/img/profilebg.png"} alt="profile" />
            </div>
            <div className='pinfo'>
                <div className='pinfocontainer'>
                    <div className='profiledp'>
                        <img className='gprofiledp' src={profile.photoURL || "/img/default_dp.png"} alt="dp" />
                    </div>
                    <Link to={"/profile/edit"}><div className='editprofile'>Edit Profile</div></Link>
                </div>
                <div className='namenbiobody'>
                    <div className='profilename'>{profile.name || 'User Name'}</div>
                    <div className='bio'>{profile.bio || 'Bio'}</div>
                </div>
            </div>
            <div className='posts'>
                <div className='mypost'>My Posts</div>
                <div className='postview'>
                    {posts.map(post => (
                        <Post
                            key={post.id}
                            background={post.mediaurl[0]} 
                            imgcount={post.mediaurl.length}
                            title={post.text}
                            like={post.likes}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Myprofile;
