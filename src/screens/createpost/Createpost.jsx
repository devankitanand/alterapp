
// import { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.css';
// import { FaArrowLeftLong, FaRegImages, FaCamera } from "react-icons/fa6";
// import { IoVideocam } from "react-icons/io5";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ClipLoader } from 'react-spinners';
// import { auth, db, storage } from '../../firebase'; 
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { onAuthStateChanged } from 'firebase/auth';
// import './createpost.css';

// const Createpost = () => {
//     const [Isnext, setIsnext] = useState(true);
//     const [text, setText] = useState('');
//     const [galleryFiles, setGalleryFiles] = useState([]);
//     const [photoCount, setPhotoCount] = useState(0);
//     const [videoCount, setVideoCount] = useState(0);
//     const [user, setUser] = useState(null);
//     const [isUploading, setIsUploading] = useState(false);

//     const photoInputRef = useRef(null);
//     const videoInputRef = useRef(null);
//     const navigate = useNavigate();  // Hook for navigation

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             if (currentUser) {
//                 setUser({
//                     uid: currentUser.uid,
//                     name: currentUser.displayName,
//                     email: currentUser.email,
//                     photoURL: currentUser.photoURL
//                 });
//             }
//         });
//         return () => unsubscribe();
//     }, []);

//     const handleFileChange = (e, type) => {
//         if (type === 'photo' && e.target.files.length > 3) {
//             toast.error("You can only select up to 3 photos.");
//             return;
//         }
//         if (type === 'video' && e.target.files.length > 1) {
//             toast.error("You can only select 1 video.");
//             return;
//         }

//         const filesArray = Array.from(e.target.files).map((file) =>
//             URL.createObjectURL(file)
//         );
//         setGalleryFiles(filesArray);
//         Array.from(e.target.files).map((file) => URL.revokeObjectURL(file)); // Avoid memory leaks

//         if (type === 'photo') {
//             setPhotoCount(e.target.files.length);
//         } else if (type === 'video') {
//             setVideoCount(e.target.files.length);
//         }
//     };

//     const handleCreatePost = async () => {
//         if (!user) {
//             console.error('No user is logged in');
//             return;
//         }

//         if (text.trim() === '' && galleryFiles.length === 0) {
//             toast.error('Cannot create an empty post.');
//             return;
//         }

//         setIsUploading(true); 

//         try {
//             const mediaUrls = await Promise.all(galleryFiles.map(async (file, index) => {
//                 const response = await fetch(file);
//                 const blob = await response.blob();
//                 const fileRef = ref(storage, `posts/${user.uid}/${Date.now()}_${index}`);
//                 await uploadBytes(fileRef, blob);
//                 const url = await getDownloadURL(fileRef);
//                 return url;
//             }));

//             await addDoc(collection(db, 'posts'), {
//                 Name: user.name,
//                 createdBy: user.email,
//                 createdAt: serverTimestamp(),
//                 likes: 0,
//                 mediaurl: mediaUrls,
//                 text: text,
//                 dpurl: user.photoURL,
//             });
//             toast.success('Post created successfully!');
//             setIsnext(true); // Reset to the initial state if needed
//             navigate('/home'); // Redirect to home page
//         } catch (error) {
//             console.error('Error creating post: ', error);
//             toast.error('Failed to create post. Please try again.');
//         } finally {
//             setIsUploading(false); // Reset uploading status
//         }
//     };

//     const triggerFileInput = (type) => {
//         if (type === 'photo') {
//             photoInputRef.current.click();
//         } else if (type === 'video') {
//             videoInputRef.current.click();
//         }
//     };

//     return (
//         <div className='createpostbody'>
//             <ToastContainer />
//             {Isnext ? (
//                 <>
//                     <div className='selected'>
//                         <Link to={"/home"}><div className='arrow'><FaArrowLeftLong size={20} color='black' /></div></Link>
//                         <div className='newpost'>New Post</div>
//                     </div>
//                     <div className='flex justify-center mt-2'>
//                         <textarea
//                             placeholder='Enter Text'
//                             className='posttextinput'
//                             value={text}
//                             onChange={(e) => setText(e.target.value)}
//                         />
//                     </div>
//                     <div className='galleryactions ml-5 mt-5'>
//                         <div>
//                             <div onClick={() => triggerFileInput('photo')} className="clickable font-bold">
//                                 <div className='flex items-center'>
//                                     <FaRegImages /> <div className='ml-2'>Photos</div>({photoCount})
//                                 </div>  
//                             </div>
//                             <div onClick={() => triggerFileInput('video')} className="clickable font-bold">
//                                 <div className='flex items-center'>
//                                     <IoVideocam />
//                                     <div className='ml-2'>Videos ({videoCount})</div>
//                                 </div>
//                             </div>
//                             <div className="clickable font-bold">
//                                 <div className='flex items-center'>
//                                     <FaCamera />
//                                     <div className='ml-2'>
//                                         Camera
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             multiple
//                             onChange={(e) => handleFileChange(e, 'photo')}
//                             ref={photoInputRef}
//                             style={{ display: 'none' }}
//                         />
//                         <input
//                             type="file"
//                             accept="video/*"
//                             multiple
//                             onChange={(e) => handleFileChange(e, 'video')}
//                             ref={videoInputRef}
//                             style={{ display: 'none' }}
//                         />
//                         <div className='flex justify-center'>
//                             <button className='save' onClick={() => setIsnext(false)}>CREATE</button>
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     <div className='newpost1'>
//                         <div onClick={() => setIsnext(true)}><FaArrowLeftLong size={20} color='black' /></div>
//                         <div className='text-xl ml-5 font-extrabold'>New Post</div>
//                     </div>
//                     <div className='flex justify-center mt-5 '>
//                         <div className='selectedimg'>
//                             <Swiper spaceBetween={10} slidesPerView={1} className='allgalleryimgs'>
//                                 {galleryFiles.map((file, index) => (
//                                     <SwiperSlide key={index} className='galleryItem'>
//                                         {file.includes("video") ? (
//                                             <video src={file} controls style={{ maxWidth: '100%', height: '100%' }} />
//                                         ) : (
//                                             <img src={file} alt={`img-${index}`} style={{ maxWidth: '100%', height: '100%' }} />
//                                         )}
//                                     </SwiperSlide>
//                                 ))}
//                             </Swiper>
//                         </div>
//                     </div>
//                     <div className='flex justify-center mt-10'>
//                         <textarea
//                             placeholder='Enter Text'
//                             className='posttextinput nextposttextinput'
//                             value={text}
//                             onChange={(e) => setText(e.target.value)}
//                         />
//                     </div>
//                     <div className='flex justify-center'>
//                         {isUploading ? (
//                             <ClipLoader className='mt-6' size={24} color={"#000"} loading={isUploading} />
//                         ) : (
//                             <button className='save' onClick={handleCreatePost}>CREATE</button>
//                         )}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Createpost;


import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { FaArrowLeftLong, FaRegImages, FaCamera } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { auth, db, storage } from '../../firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import './createpost.css';

const Createpost = () => {
    const [Isnext, setIsnext] = useState(true);
    const [text, setText] = useState('');
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [photoCount, setPhotoCount] = useState(0);
    const [videoCount, setVideoCount] = useState(0);
    const [user, setUser] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const photoInputRef = useRef(null);
    const videoInputRef = useRef(null);
    const navigate = useNavigate();  // Hook for navigation

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid,
                    name: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL
                });
            }
        });
        return () => unsubscribe();
    }, []);

    const handleFileChange = (e, type) => {
        if (type === 'photo' && e.target.files.length > 3) {
            toast.error("You can only select up to 3 photos.");
            return;
        }
        if (type === 'video' && e.target.files.length > 1) {
            toast.error("You can only select 1 video.");
            return;
        }

        const filesArray = Array.from(e.target.files).map((file) => {
            const newFile = new File([file], file.name + (type === 'video' ? 'video' : ''), { type: file.type });
            return URL.createObjectURL(newFile);
        });

        setGalleryFiles(filesArray);
        Array.from(e.target.files).forEach((file) => URL.revokeObjectURL(file)); // Avoid memory leaks

        if (type === 'photo') {
            setPhotoCount(e.target.files.length);
        } else if (type === 'video') {
            setVideoCount(e.target.files.length);
        }
    };

    const handleCreatePost = async () => {
        if (!user) {
            console.error('No user is logged in');
            return;
        }

        if (text.trim() === '' && galleryFiles.length === 0) {
            toast.error('Cannot create an empty post.');
            return;
        }

        setIsUploading(true); 

        try {
            const mediaUrls = await Promise.all(galleryFiles.map(async (file, index) => {
                const response = await fetch(file);
                const blob = await response.blob();
                const filename = `${Date.now()}_${index}_${blob.type.includes('video') ? 'video' : ''}`;
                const fileRef = ref(storage, `posts/${user.uid}/${filename}`);
                await uploadBytes(fileRef, blob);
                const url = await getDownloadURL(fileRef);
                return url;
            }));

            await addDoc(collection(db, 'posts'), {
                Name: user.name,
                createdBy: user.email,
                createdAt: serverTimestamp(),
                likes: 0,
                mediaurl: mediaUrls,
                text: text,
                dpurl: user.photoURL,
            });
            toast.success('Post created successfully!');
            setIsnext(true); // Reset to the initial state if needed
            navigate('/home'); // Redirect to home page
        } catch (error) {
            console.error('Error creating post: ', error);
            toast.error('Failed to create post. Please try again.');
        } finally {
            setIsUploading(false); // Reset uploading status
        }
    };

    const triggerFileInput = (type) => {
        if (type === 'photo') {
            photoInputRef.current.click();
        } else if (type === 'video') {
            videoInputRef.current.click();
        }
    };

    return (
        <div className='createpostbody'>
            <ToastContainer />
            {Isnext ? (
                <>
                    <div className='selected'>
                        <Link to={"/home"}><div className='arrow'><FaArrowLeftLong size={20} color='black' /></div></Link>
                        <div className='newpost'>New Post</div>
                    </div>
                    <div className='flex justify-center mt-2'>
                        <textarea
                            placeholder='Enter Text'
                            className='posttextinput'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className='galleryactions ml-5 mt-5'>
                        <div>
                            <div onClick={() => triggerFileInput('photo')} className="clickable font-bold">
                                <div className='flex items-center'>
                                    <FaRegImages /> <div className='ml-2'>Photos</div>({photoCount})
                                </div>  
                            </div>
                            <div onClick={() => triggerFileInput('video')} className="clickable font-bold">
                                <div className='flex items-center'>
                                    <IoVideocam />
                                    <div className='ml-2'>Videos ({videoCount})</div>
                                </div>
                            </div>
                            <div className="clickable font-bold">
                                <div className='flex items-center'>
                                    <FaCamera />
                                    <div className='ml-2'>
                                        Camera
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleFileChange(e, 'photo')}
                            ref={photoInputRef}
                            style={{ display: 'none' }}
                        />
                        <input
                            type="file"
                            accept="video/*"
                            multiple
                            onChange={(e) => handleFileChange(e, 'video')}
                            ref={videoInputRef}
                            style={{ display: 'none' }}
                        />
                        <div className='flex justify-center'>
                            <button className='save' onClick={() => setIsnext(false)}>CREATE</button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='newpost1'>
                        <div onClick={() => setIsnext(true)}><FaArrowLeftLong size={20} color='black' /></div>
                        <div className='text-xl ml-5 font-extrabold'>New Post</div>
                    </div>
                    <div className='flex justify-center mt-5 '>
                        <div className='selectedimg'>
                            <Swiper spaceBetween={10} slidesPerView={1} className='allgalleryimgs'>
                                {galleryFiles.map((file, index) => (
                                    <SwiperSlide key={index} className='galleryItem'>
                                        {file.includes("video") ? (
                                            <video src={file} controls style={{ maxWidth: '100%', height: '100%' }} />
                                        ) : (
                                            <img src={file} alt={`img-${index}`} style={{ maxWidth: '100%', height: '100%' }} />
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <textarea
                            placeholder='Enter Text'
                            className='posttextinput nextposttextinput'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-center'>
                        {isUploading ? (
                            <ClipLoader className='mt-6' size={24} color={"#000"} loading={isUploading} />
                        ) : (
                            <button className='save' onClick={handleCreatePost}>CREATE</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Createpost;
