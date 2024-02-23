import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header/Header";
import UserForm from "../components/User/UserForm";

const User = () => {

    return (
        <>
            <Header />
            <div className="container">
                <UserForm />
            </div>
        </>
    )

}

export default User;