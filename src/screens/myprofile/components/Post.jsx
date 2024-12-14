import { GiHearts } from "react-icons/gi";
const Post = (props) => {
  return (
    <>
    <div className='profilepostbody' style={{
        backgroundImage: `url(${props.background})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
    }}>
        <div className="overlaypost">
            <div className="flex justify-end">
                <div className="postcount">1/{props.imgcount}</div>
            </div>
            
            <div>
                <div className="text-white">{props.title}</div>
                <div className="profilepostlike">
                    <GiHearts color="white"/>
                    <div className="ml-1 text-white">{props.like}</div>
                </div>
            </div>
        </div>
        
    </div>
    </>
  )
}

export default Post