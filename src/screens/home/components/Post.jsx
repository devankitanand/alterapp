import { IoMdHeartEmpty } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";
const Post = () => {
  return (
    <div className="postbody">
        <div className="puserinfo">
            <div className="pdp"></div>
            <div className="puserbox">
                <div className="pusername">Aarav</div>
                <div className="ptime">2 hours ago</div>
            </div>
        </div>
        <div className="posttext">
            Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽 #NYC #Travel
            </div>

            <div className="images">
                <div></div>
                <div></div>
            </div>
            <div className="useractions">
              
                <div className="uaction">
                  <div className="likeicon"><IoMdHeartEmpty size={22}/></div>
                  
                  <div className="likecount">67</div>
                </div> 
                
               
              <div className="sharebtn">
                <div className="shareicon">
                <FaLocationArrow /> 
                </div>
                <div className="sharetext">Share</div>
                
                </div>
            
            </div>
    </div>
  )
}

export default Post