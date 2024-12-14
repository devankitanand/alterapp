
// import { useState } from "react";
// import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
// import { FaLocationArrow } from "react-icons/fa";
// import { db } from '../../../firebase'; 
// import { doc, updateDoc, increment } from "firebase/firestore";

// const Post = (props) => {
//   const [likeCount, setLikeCount] = useState(props.likes);
//   const [liked, setLiked] = useState(false);
//   const [isLiking, setIsLiking] = useState(false); // New state to disable button temporarily

//   const handleLike = async () => {
//     if (isLiking) return; // Prevent multiple clicks

//     setIsLiking(true); // Disable the like button
//     const postRef = doc(db, 'posts', props.id);

//     try {
//       if (liked) {
//         setLikeCount(likeCount - 1);
//         await updateDoc(postRef, {
//           likes: increment(-1)
//         });
//       } else {
//         setLikeCount(likeCount + 1);
//         await updateDoc(postRef, {
//           likes: increment(1)
//         });
//       }

//       setLiked(!liked);
//     } catch (error) {
//       console.error('Error updating like count:', error);
//     } finally {
//       setIsLiking(false); // Re-enable the like button
//     }
//   };

//   const renderPostText = (text) => {
//     return text.split(' ').map((word, index) => (
//       word.startsWith('#') 
//         ? <span key={index} style={{ color: 'blue' }}>{word} </span>
//         : <span key={index}>{word} </span>
//     ));
//   };

//   const imageCount = props.images.length;
//   const imageClass = imageCount === 1 ? 'one' : imageCount === 2 ? 'two' : imageCount === 3 ? 'three' : 'four';

//   const formatTimeAgo = (timestamp) => {
//     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);
//     const diffInMinutes = Math.floor(diffInSeconds / 60);
//     const diffInHours = Math.floor(diffInMinutes / 60);
//     const diffInDays = Math.floor(diffInHours / 24);

//     if (diffInSeconds < 60) {
//       return `${diffInSeconds} seconds ago`;
//     } else if (diffInMinutes < 60) {
//       return `${diffInMinutes} minutes ago`;
//     } else if (diffInHours < 24) {
//       return `${diffInHours} hours ago`;
//     } else {
//       return `${diffInDays} days ago`;
//     }
//   };

//   return (
//     <div className="postbody">
//       <div className="puserinfo">
//         <div className="pdp">
//           <img className="pdp" src={props.dp} alt="User DP" />
//         </div>
//         <div className="puserbox">
//           <div className="pusername">{props.name}</div>
//           <div className="ptime">{formatTimeAgo(props.timesago)}</div>
//         </div>
//       </div>
//       <div className="posttext">
//         {renderPostText(props.posttext)}
//       </div>

//       {props.images.length > 0 && (
//         <div className={`images ${imageClass}`}>
//           {props.images.map((url, index) => {
//             const isVideo = url.includes('video'); // Checking if 'video' keyword is in the URL
//             return isVideo ? (
//               <video className="rounded-xl" key={index} src={url} controls style={{ maxWidth: '100%', height: '100%' }} />
//             ) : (
//               <img key={index} src={url} alt={`post-img-${index}`} style={{ maxWidth: '100%', height: '100%' }} />
//             );
//           })}
//         </div>
//       )}

//       <div className="useractions">
//         <div className="uaction" onClick={handleLike} style={{ pointerEvents: isLiking ? 'none' : 'auto' }}>
//           <div className="likeicon">
//             {liked ? <IoMdHeart size={22} color="red" /> : <IoMdHeartEmpty size={22} />}
//           </div>
//           <div className="likecount">{likeCount}</div>
//         </div>
//         <div className="sharebtn">
//           <div className="shareicon">
//             <FaLocationArrow />
//           </div>
//           <div className="sharetext">Share</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Post.defaultProps = {
//   images: [],
//   likes: 0,
// };

// export default Post;


import { useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";
import { db } from '../../../firebase'; 
import { doc, updateDoc, increment } from "firebase/firestore";
import { IoClose } from "react-icons/io5";
import { IoIosCopy } from "react-icons/io";


const Post = (props) => {
  const [likeCount, setLikeCount] = useState(props.likes);
  const [liked, setLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false); // New state to disable button temporarily
  const [isOverlayVisible, setIsOverlayVisible] = useState(false); // State to control overlay visibility

  const handleLike = async () => {
    if (isLiking) return; // Prevent multiple clicks

    setIsLiking(true); // Disable the like button
    const postRef = doc(db, 'posts', props.id);

    try {
      if (liked) {
        setLikeCount(likeCount - 1);
        await updateDoc(postRef, {
          likes: increment(-1)
        });
      } else {
        setLikeCount(likeCount + 1);
        await updateDoc(postRef, {
          likes: increment(1)
        });
      }

      setLiked(!liked);
    } catch (error) {
      console.error('Error updating like count:', error);
    } finally {
      setIsLiking(false); // Re-enable the like button
    }
  };

  const handleShare = () => {
    setIsOverlayVisible(true);
  };

  const renderPostText = (text) => {
    return text.split(' ').map((word, index) => (
      word.startsWith('#') 
        ? <span key={index} style={{ color: 'blue' }}>{word} </span>
        : <span key={index}>{word} </span>
    ));
  };

  const imageCount = props.images.length;
  const imageClass = imageCount === 1 ? 'one' : imageCount === 2 ? 'two' : imageCount === 3 ? 'three' : 'four';

  const formatTimeAgo = (timestamp) => {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div className="postbody">
      <div className="puserinfo">
        <div className="pdp">
          <img className="pdp" src={props.dp} alt="User DP" />
        </div>
        <div className="puserbox">
          <div className="pusername">{props.name}</div>
          <div className="ptime">{formatTimeAgo(props.timesago)}</div>
        </div>
      </div>
      <div className="posttext">
        {renderPostText(props.posttext)}
      </div>

      {props.images.length > 0 && (
        <div className={`images ${imageClass}`}>
          {props.images.map((url, index) => {
            const isVideo = url.includes('video'); // Checking if 'video' keyword is in the URL
            return isVideo ? (
              <video className="rounded-xl" key={index} src={url} controls style={{ maxWidth: '100%', height: '100%' }} />
            ) : (
              <img key={index} src={url} alt={`post-img-${index}`} style={{ maxWidth: '100%', height: '100%' }} />
            );
          })}
        </div>
      )}

      <div className="useractions">
        <div className="uaction" onClick={handleLike} style={{ pointerEvents: isLiking ? 'none' : 'auto' }}>
          <div className="likeicon">
            {liked ? <IoMdHeart size={22} color="red" /> : <IoMdHeartEmpty size={22} />}
          </div>
          <div className="likecount">{likeCount}</div>
        </div>
        <div className="sharebtn" onClick={handleShare}>
          <div className="shareicon">
            <FaLocationArrow />
          </div>
          <div className="sharetext">Share</div>
        </div>
      </div>

      {isOverlayVisible && (
        <div className="overlay">
          <div className="overlay-content">
            <div className="overlay-header">
              <div className="font-bold text-xl">Share post</div>
              <div className="close" onClick={() => setIsOverlayVisible(false)}><IoClose /></div>
            </div>
            <div className="overlay-body">
              
              <div className="flex-col justify-items-center">
                <img src="/img/twitter.png" alt="insts" width={50}/>
                <div className="font-normal text-xs text-gray-500 mt-1">Twitter</div>
              </div>

              <div className="flex-col justify-items-center">
                <img src="/img/fb.png" alt="insts" width={50}/>
                <div className="font-normal text-xs text-gray-500 mt-1">Facebook</div>
              </div>

              <div className="flex-col justify-items-center">
                <img src="/img/reddit.png" alt="insts" width={50}/>
                <div className="font-normal text-xs text-gray-500 mt-1">Reddit</div>
              </div>

              <div className="flex-col justify-items-center">
                <img src="/img/discord.png" alt="insts" width={50}/>
                <div className="font-normal text-xs text-gray-500 mt-1">Discord</div>
              </div>

              <div className="flex-col justify-items-center">
                <img src="/img/whatsapp.png" alt="insts" width={50}/>
                <div className="font-normal text-xs text-gray-500 mt-1">WhatsApp</div>
              </div>

              <div className="flex-col justify-items-center">
                <img src="/img/messenger.png" alt="insts" width={50}/>
                <div className="font-normal text-xs text-gray-500 mt-1">Messenger</div>
              </div>

              <div className="flex-col justify-items-center">
                <img src="/img/telegram.png" alt="insts" width={50}/>
                <div className="font-normal text-xs text-gray-500 mt-1">Telegram</div>
              </div>

              <div className="flex-col justify-items-center">
                <img src="/img/instagram.png" alt="insts" width={50}/>
                <div className="font-normal text-xs text-gray-500 mt-1">Instagram</div>
              </div>

            </div>
            <div className="mt-5">
              <div className="font-medium">Page Link</div>
              <div className="copysec">
                <div>https://alterapp.vercel.app/home</div>
                <div><IoIosCopy /></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Post.defaultProps = {
  images: [],
  likes: 0,
};

export default Post;
