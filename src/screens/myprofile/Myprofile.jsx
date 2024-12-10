import Post from './components/Post';
import './myprofile.css';
import { FaArrowLeftLong } from "react-icons/fa6";
const Myprofile = () => {
  return (
    <>
    <div className='myprofilebody'>
        <div className='pimgdiv'>
            <div className='arrow'><FaArrowLeftLong size={20} color='white'/></div>
            <img className='profileimg' src="/img/profilebg.png" alt="profile" />
        </div>
        <div className='pinfo'>
            <div className='pinfocontainer'>
                <div className='profiledp'></div>
                <div className='editprofile'>Edit Profile</div>
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