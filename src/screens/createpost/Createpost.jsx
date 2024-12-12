import Images from './components/Images'
import './createpost.css'
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiCheckboxMultipleFill } from "react-icons/ri";
import { FaCamera } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';


const Createpost = () => {
    const [Isnext, setIsnext] = useState(true);
    const [text, setText] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);

    const handleFileChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) =>
                URL.createObjectURL(file)
            );
            setGalleryFiles(filesArray);
            setSelectedFile(e.target.files[0]); // Set the first file as the selected file
            Array.from(e.target.files).map((file) => URL.revokeObjectURL(file)); // Avoid memory leaks
        }
    };
    
  return (
    <div className='createpostbody'>
        
        {Isnext ? <>
                <div className='selected'>
                <Link to={"/home"}><div className='arrow'><FaArrowLeftLong size={20} color='black'/></div></Link>
                
                <div className='newpost'>New Post</div>

            </div>
            <div>
                <div className='flex justify-center mt-2'>
                    <textarea placeholder='Enter Text' className='posttextinput' value={text} onChange={(e) => setText(e.target.value)}/>
                </div>
            </div>
            <div className='galleryactions ml-5 mt-5'>
                <div>
                <input type="file" accept="image/*,video/*" multiple onChange={handleFileChange} id="galleryInput" placeholder='upload'/> 
                
                
                    
                </div>
                <div>
                    camera
                </div>
                <div className='flex justify-center'>
            <button className='save' onClick={() => setIsnext(false)}>CREATE</button>
        </div>
            </div>
            
        </> : 
        <>
        <div className='newpost1'> 
            <div onClick={() => setIsnext(true)}><FaArrowLeftLong size={20} color='black'/></div>
            <div className='text-xl ml-5 font-extrabold'>New Post</div>
        </div>
        <div className='flex justify-center mt-5 '>
            <div className='selectedimg'>
            <Swiper spaceBetween={10} slidesPerView={1} className='allgalleryimgs'>
                                {galleryFiles.map((file, index) => (
                                    <SwiperSlide key={index} className='galleryItem'>
                                        {file.includes("video") ? (
                                            <video src={file} controls style={{ maxWidth: '100%', height: '50%' }} />
                                        ) : (
                                            <img src={file} alt={`img-${index}`} style={{ maxWidth: '100%', height: '50%' }} />
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
            </div>
        </div>
        
        <div className='flex justify-center mt-10'>
        <textarea placeholder='Enter Text' className='posttextinput' value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
        <div className='flex justify-center'>
            <button className='save'>CREATE</button>
        </div>
        </>}
    </div>
  )
}

export default Createpost


