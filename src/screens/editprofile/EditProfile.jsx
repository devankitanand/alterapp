import { FaArrowLeftLong } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import './editprofile.css';
const EditProfile = () => {
  return (
    <div>
        <div className='pimgdiv'>
            <div className='arrow'><FaArrowLeftLong size={20} color='white'/></div>
            <img className='profileimg' src="/img/profilebg.png" alt="profile" />
            <div className="editcover"><MdEdit /></div>
        </div>
        <div className='pinfo'>
            <div className='pinfocontainer'>
                <div className='profiledp editdpcircle'>
                    <div className="editcover editdpbtn"><MdEdit /></div>
                </div>
            </div>
            <div className='namenbiobody'>
                <div className="Nameedit">
                    <div>Name</div>
                    <div>
                    <input type="text" placeholder="Enter your name" className="nameinput"/>
                    </div>
                </div>
                <div className="bioedit">
                    <div>Bio</div>
                    <div>
                    <input type="text" placeholder="Enter bio" className="nameinput"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center">
            <button type="submit" className="save">Save</button>
        </div>
    </div>
  )
}

export default EditProfile