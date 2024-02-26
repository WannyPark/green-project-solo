import Cookie from "js-cookie";
import { useEffect } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import * as auth from "../../apis/auth";
import "./MyInfoCp.css";

const MyInfoCp = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const cookie = Cookie.get("accessToken");
        if (cookie == null) {
            navigate("/");
            return ;
        }
        $(".myInfo_form").css("display", "flex").hide().fadeIn(500);
        const getUserInfo = async () => {
            const response = await auth.info();
            const userId = response.data.userId;
            const userName = response.data.name;
            const userEmail = response.data.email;
            $("#myInfo_id").val(userId);
            $("#myInfo_name").val(userName);
            $("#myInfo_email").val(userEmail);
        }
        getUserInfo();
    }, [])

    return (
        <>
            <div className="myInfo_form">
                <div className="myInfo_title">
                    <h2>My Infomation</h2>
                </div>
                <div className="myInfo_id_area">
                    <input type="text" id="myInfo_id" name="myInfo_id" readOnly />
                </div>
                <div className="myInfo_pw_area">
                    <input type="password" id="myInfo_pw" name="myInfo_pw" placeholder="Old Password" />
                </div>
                <div className="myInfo_pw_area">
                    <input type="password" id="myInfo_pw" name="myInfo_pw" placeholder="New Password" />
                </div>
                <div className="myInfo_pw_area">
                    <input type="password" id="myInfo_pw_check" name="myInfo_pw_check" placeholder="Check New Password" />
                </div>
                <div className="myInfo_name_area">
                    <input type="text" id="myInfo_name" name="myInfo_name" readOnly />
                </div>
                <div className="myInfo_email_area">
                    <input type="text" id="myInfo_email" name="myInfo_email" readOnly />
                </div>
                <div className="myInfo_button_area">
                    <input type="button" className="myInfo_button" value="수정" />
                </div>
            </div>
        </>
    )

}

export default MyInfoCp;