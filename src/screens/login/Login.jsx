
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FcGoogle } from "react-icons/fc";
import { auth, googleprovider, db } from '../../firebase';
import { signInWithPopup , signInWithRedirect} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Login = () => {
  const navigate = useNavigate();

  const signinwithgoogle = async () => {
    try {
      const result = await signInWithRedirect(auth, googleprovider);
      const user = result.user;
      // Check if user document already exists
      const userDocRef = doc(db, 'user', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Store user data in Firestore only if the document does not exist
        await setDoc(userDocRef, {
          displayName: user.displayName,
          photoURL: user.photoURL,
          bio: 'bio', 
          coverpic: '',
        });
        
      }

      navigate('/home');
    } catch (error) {
      console.error('Error during Google Sign-In: ', error);
    }
  }

  return (
    <div className='loginbody'>
      <div className='bg'>
        <div className='fcolumn'>
          <div className='pb-100'><img src='/img/img (8).jpg' alt='img' /></div>
          <div><img src='/img/img (1).jpg' alt='img' /></div>
          <div><img src='/img/img (7).jpg' alt='img' /></div>
        </div>
        <div className='scolumn'>
          <div><img src='/img/img (6).jpg' alt='img' /></div>
          <div><img src='/img/img (4).jpg' alt='img' /></div>
          <div><img src='/img/img (2).jpg' alt='img' /></div>
        </div>
        <div className='tcolumn'>
          <div><img src='/img/img (9).jpg' alt='img' /></div>
          <div><img src='/img/img (5).jpg' alt='img' /></div>
          <div><img src='/img/img (3).jpg' alt='img' /></div>
        </div>
      </div>
      <div className='lbottomdrawer'>
        <div className='logowrap'><img src='/img/logo1.png' alt='logo' /> <span className='appname'>Vibesnap</span></div>
        <div>Moments That Matter, Shared Forever.</div>
        <div className='lwgoogle'>
          <div><FcGoogle size={20} /></div>
          <div onClick={signinwithgoogle}><span className='ltextgoogle'>Continue with Google</span></div>
        </div>
      </div>
    </div>
  )
}

export default Login;
