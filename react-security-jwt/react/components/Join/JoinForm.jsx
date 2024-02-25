import React, { useContext } from "react";
import * as auth from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import * as Swal from "../../apis/alert";

const JoinForm = () => {

    const navigate = useNavigate();

    const onJoin = async (e) => {
        e.preventDefault();

        const form = e.target;
        const username = form.username.value;
        const password = form.password.value;
        const name = form.name.value;
        const email = form.email.value;

        console.log(`username : ${username}`);
        console.log(`password : ${password}`);
        console.log(`name : ${name}`);
        console.log(`email : ${email}`);

        try {
            const response = await auth.join({
                "userId" : username,
                "userPw" : password,
                "name" : name,
                "email" : email,
            })
            const status = response.status;
            console.log(response.data);
            if (status == 200) {
                console.log("회원가입 성공 !");
                Swal.alert(`회원가입 성공`, `로그인 화면으로 이동합니다.`, `success`, () => {navigate("/loginPage")});
                // alert("회원가입 성공 !");
                // navigate("/login");
            } else {
                console.log("회원가입 실패 !")
                Swal.alert(`회원가입 실패`, `회원가입에 실패하였습니다.`, `error`);
                // alert("회원가입 실패 !");
            }
        } catch (error) {
            Swal.alert(`회원가입 실패`, `회원가입에 실패하였습니다.`, `error`);
            return ;
        }
    }

    return (
        <div className="form">
            <h2 className="login-title">Join</h2>
            <form className="login-form" onSubmit={(e) => onJoin(e)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" 
                           id="username"
                           placeholder="username"
                           name="username"
                           autoComplete="username"
                           required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" 
                                id="password"
                                placeholder="password"
                                name="password"
                                autoComplete="password"
                                required
                    />
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" 
                           id="name"
                           placeholder="name"
                           name="name"
                           autoComplete="name"
                           required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" 
                           id="email"
                           placeholder="email"
                           name="email"
                           autoComplete="email"
                           required
                    />
                </div>
                <button type="submit" className="btn btn--form btn-login">
                    Join
                </button>
            </form>
        </div>
    )

}

export default JoinForm;