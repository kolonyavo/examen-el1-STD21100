import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export default function PrivateHome() {

    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth)
            navigate("/")
        } catch (error) {
            alert("For some reasons we cannot disconnect, please check your internet connection and try again.")
        }
    }

    return (
        <div className="container p-5">
            <h1 className="display-3 text-light mb-4">Hooray ! <br /> Your are connected</h1>
            <button className="btn btn-danger ms-2" onClick={logout}>
                Log out
            </button>
        </div>
    );
}