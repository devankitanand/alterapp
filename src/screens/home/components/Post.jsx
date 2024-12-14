
// import { useState } from "react";
// import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
// import { FaLocationArrow } from "react-icons/fa";
// import { db } from '../../../firebase'; // Ensure Firestore is correctly imported
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

//   const imageCount = props.images.length;
//   const imageClass = imageCount === 1 ? 'one' : imageCount === 2 ? 'two' : imageCount === 3 ? 'three' : 'four';

//   return (
//     <div className="postbody">
//       <div className="puserinfo">
//         <div className="pdp">
//           <img className="pdp" src={props.dp} alt="User DP" />
//         </div>
//         <div className="puserbox">
//           <div className="pusername">{props.name}</div>
//           <div className="ptime">{props.timesago}</div>
//         </div>
//       </div>
//       <div className="posttext">
//         {props.posttext}
//       </div>

//       <div className={`images ${imageClass}`}>
//         {props.images.map((url, index) => (
//           <img src={url} alt={`post-img-${index}`} key={index} />
//         ))}
//       </div>
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
import { db } from '../../../firebase'; // Ensure Firestore is correctly imported
import { doc, updateDoc, increment } from "firebase/firestore";

const Post = (props) => {
  const [likeCount, setLikeCount] = useState(props.likes);
  const [liked, setLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false); // New state to disable button temporarily

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

  const renderPostText = (text) => {
    return text.split(' ').map((word, index) => (
      word.startsWith('#') 
        ? <span key={index} style={{ color: 'blue' }}>{word} </span>
        : <span key={index}>{word} </span>
    ));
  };

  const imageCount = props.images.length;
  const imageClass = imageCount === 1 ? 'one' : imageCount === 2 ? 'two' : imageCount === 3 ? 'three' : 'four';

  return (
    <div className="postbody">
      <div className="puserinfo">
        <div className="pdp">
          <img className="pdp" src={props.dp} alt="User DP" />
        </div>
        <div className="puserbox">
          <div className="pusername">{props.name}</div>
          <div className="ptime">{props.timesago}</div>
        </div>
      </div>
      <div className="posttext">
        {renderPostText(props.posttext)}
      </div>

      <div className={`images ${imageClass}`}>
        {props.images.map((url, index) => (
          <img src={url} alt={`post-img-${index}`} key={index} />
        ))}
      </div>
      <div className="useractions">
        <div className="uaction" onClick={handleLike} style={{ pointerEvents: isLiking ? 'none' : 'auto' }}>
          <div className="likeicon">
            {liked ? <IoMdHeart size={22} color="red" /> : <IoMdHeartEmpty size={22} />}
          </div>
          <div className="likecount">{likeCount}</div>
        </div>
        <div className="sharebtn">
          <div className="shareicon">
            <FaLocationArrow />
          </div>
          <div className="sharetext">Share</div>
        </div>
      </div>
    </div>
  );
}

Post.defaultProps = {
  images: [],
  likes: 0,
};

export default Post;
