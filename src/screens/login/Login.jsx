import { Link } from 'react-router-dom';
import './login.css';
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  return (
    <div className='loginbody'>
      <div className='bg'>
        <div className='fcolumn'>
          <div className='pb-100'><img src='/img/img (8).jpg' alt='img'/></div>
          <div><img src='/img/img (1).jpg' alt='img'/></div>
          <div><img src='/img/img (7).jpg' alt='img'/></div>
          </div>
        <div className='scolumn'>
        <div><img src='/img/img (6).jpg' alt='img'/></div>
          <div><img src='/img/img (4).jpg' alt='img'/></div>
          <div><img src='/img/img (2).jpg' alt='img'/></div>
        </div>
        <div className='tcolumn'>
        <div><img src='/img/img (9).jpg' alt='img'/></div>
          <div><img src='/img/img (5).jpg' alt='img'/></div>
          <div><img src='/img/img (3).jpg' alt='img'/></div>
        </div>
      </div>
      <div className='lbottomdrawer'>
        <div className='logowrap'><img src='/img/logo1.png' alt='logo'/> <span className='appname'>Vibesnap</span></div>
        <div>Moments That Matter, Shared Forever.</div>
        <Link to={"/home"}><div className='lwgoogle'><div><FcGoogle size={20}/></div> <div><span className='ltextgoogle'>Continue with Google</span></div></div></Link>
        
      </div>
    </div>
  )
}

export default Login