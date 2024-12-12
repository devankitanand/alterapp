import "./home.css";
import Post from "./components/Post";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
<>
<div className="homebody">
    <Link to={"/profile"}>
    <div className="userinfo">
        <div className="userdp"></div>
        <div className="userbox">
            <div className="welcometxt">Welcome Back</div>
            <div className="username">Sakshi Agarwal</div>
        </div>
    </div>
    </Link>
    <div className="feedtext">
        Feeds
    </div>
    <div className="feed">
        <Post/>
        <Post/>
        <Post/>
        <Post/>
    </div>
    <Link to={"/createpost"}><div className="createpostbtn">+</div></Link>
    
</div>
</>  
)
}

export default Home