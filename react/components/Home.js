import Nav from "./Nav";
import axios from "axios";
import cookie from "js-cookie";
import "../css/home.css";

const Home = () => {
    const getMemInfo = async () => {
        const data = {
            token : cookie.get("userToken"),
        }
        await axios.post("/api/mem/getMemInfo", data)
        .then(res => {
            console.log(res);
        });
    }

    return (
        <div className="home">
            <Nav />
            <input type="button" onClick={getMemInfo} value="유저정보얻기"></input>
        </div>
    )

}

export default Home;