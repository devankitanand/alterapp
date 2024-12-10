import { GiHearts } from "react-icons/gi";
const Post = () => {
  return (
    <>
    <div className='profilepostbody' style={{
        backgroundImage: "url('/img/postimg.png')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
    }}>
        <div className="overlaypost">
            <div className="postcount">1/2</div>
            <div>
                <div className="text-white">Design</div>
                <div className="profilepostlike">
                    <GiHearts color="white"/>
                    <div className="ml-1 text-white">67</div>
                </div>
            </div>
        </div>
        
    </div>
    </>
  )
}

export default Post