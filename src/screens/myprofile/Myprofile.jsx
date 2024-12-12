import Post from './components/Post';
import './myprofile.css';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Myprofile = () => {
  return (
    <>
    <div className='myprofilebody'>
        <div className='pimgdiv'>
            <Link to={"/home"}><div className='arrow'><FaArrowLeftLong size={20} color='white'/></div></Link>
            
            <img className='profileimg' src="/img/profilebg.png" alt="profile" />
        </div>
        <div className='pinfo'>
            <div className='pinfocontainer'>
                <div className='profiledp'></div>
                <Link to={"/profile/edit"}><div className='editprofile'>Edit Profile</div></Link>
            </div>
            <div className='namenbiobody'>
                <div className='profilename'>Sakshi Agarwal</div>
                <div className='bio'>
                    Just someone who loves designing, sketching, and finding beauty in the little things 💕
                </div>
            </div>
        </div>
        <div className='posts'>
            <div className='mypost'>My Posts</div>
            <div className='postview'>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>

    </div>
    </>
  )
}

export default Myprofile