import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {

    const { signUp } = useContext(UserContext)
    const [validation, setValidation] = useState("");

    const inputs = useRef([]);
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    const formRef = useRef();

    const handleForm = async (e) => {
        e.preventDefault()

        if (inputs.current[1].value.length < 6 || inputs.current[2].value.length < 6) {
            setValidation("6 caractères minimum")
            return;
        }
        else if (inputs.current[1].value !== inputs.current[2].value) {
            setValidation("Password not match")
            return;
        }

        try {
            const cred = await signUp(
                inputs.current[0].value,
                inputs.current[1].value
            )
            formRef.current.reset();
            setValidation("")
            navigate("/")
            return cred;
        } catch (err) {
            if (err.code === "auth/invalid-email") {
                setValidation("Email format invalid")
            }
            if (err.code === "auth/email-already-in-use") {
                setValidation("Email already in use")
            }

        }
    }

    const navigate = useNavigate();
    const backHome = async () => {
        try {
            await signOut(auth)
            navigate("/")
        } catch (error) {
            alert("For some reasons we can't deconnect, please check your internet connexion and retry.")
        }
    }

    const resetForm = () => {
        setValidation("")
        formRef.current.reset()
    }

    return (
        <div className="container items-center w-50 border card my-5"
            style={{ minWidth: "400px" }}>
            <Link to="/" className="mt-2">
                <i onClick={backHome} className="bi bi-arrow-left-circle-fill">Back</i>
            </Link>

            <div className="modal-dialog w-100 pb-4 pt-1 px-4">
                <div className="modal-content">
                    <div className="modal-header">
                    </div>

                    <div className="modal-body">
                        <h5 className="modal-title mb-3 text-center">Sign Up</h5>
                        <form
                            ref={formRef}
                            onSubmit={handleForm}
                            className="sign-up-form">
                            <div className="mb-3">
                                <label className="py-1" htmlFor="signUpEmail">Email address</label>
                                <input
                                    ref={addInputs}
                                    name="email" required type="email" className="form-control" placeholder="email.address@...com" />
                            </div>
                            <div className="mb-3">
                                <label className="py-1" htmlFor="signUpPwd">Password</label>
                                <input
                                    ref={addInputs}
                                    name="pwd" required type="password" className="form-control" placeholder="enter your password..." />
                            </div>
                            <div className="mb-3">
                                <label className="py-1" htmlFor="signUpPwd">Repeat Password</label>
                                <input
                                    ref={addInputs}
                                    name="repeatpwd" required type="password" className="form-control" placeholder="repeate your password..." />
                                <p className="text-danger mt-1">{validation}</p>
                            </div>

                            <div className="d-flex flex-row w-100 justify-content-between">
                                <button className="btn btn-primary  mb-4 ">Sign Up </button>
                                <button onClick={resetForm} className="btn btn-primary mb-4">Reset form</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}