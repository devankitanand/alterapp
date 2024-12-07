import "./home.css";
import Post from "./components/Post";
const Home = () => {
  return (
<>
<div className="homebody">
    <div className="userinfo">
        <div className="userdp"></div>
        <div className="userbox">
            <div className="welcometxt">Welcome Back</div>
            <div className="username">Sakshi Agarwal</div>
        </div>
    </div>
    <div className="feedtext">
        Feeds
    </div>
    <div className="feed">
        <Post/>
        <Post/>
        <Post/>
        <Post/>
    </div>
    <div className="createpostbtn">+</div>
</div>
</>  
)
}

export default Home