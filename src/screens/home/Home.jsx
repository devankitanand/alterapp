
import "./home.css";
import Post from "./components/Post";
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GoSignOut } from "react-icons/go";

const Home = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        navigate('/');
      } else {
        setUser(currentUser);

        const userDoc = await getDoc(doc(db, 'user', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfilePic(userData.photoURL);
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(postsQuery);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(), // Convert Firestore Timestamp to Date object
      }));
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <>
      <div className="homebody">
        {user ? (
          <div className="userinfo">
            <Link to={"/profile"}>
              <div className="textinfo">
                <div className="userdp">
                  <img src={profilePic || user.photoURL} className="userdp" alt="dp" />
                </div>
                <div className="userbox">
                  <div className="welcometxt">Welcome Back</div>
                  <div className="username">{user.displayName}</div>
                </div>
              </div>
            </Link>
            <div onClick={logout} className="mt-4"><GoSignOut size={25} /></div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="feedtext">
          Feeds
        </div>
        <div className="feed">
          {posts.map(post => (
            <Post
              key={post.id}
              id={post.id} 
              name={post.Name}
              dp={post.dpurl} 
              timesago={post.createdAt} // Pass the Date object
              posttext={post.text}
              images={post.mediaurl}
              likes={post.likes} // Pass the likes to the Post component
            />
          ))}
        </div>
        <Link to={"/createpost"}><div className="createpostbtn">+</div></Link>
      </div>
    </>
  );
};

export default Home;
