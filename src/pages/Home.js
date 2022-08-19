import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import PrivateHome from "./PrivateHome";

export default function Home() {

    const navigate = useNavigate();

    const inputs = useRef([]);
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    const formRef = useRef();

    const [validation, setValidation] = useState("");
    const { signIn } = useContext(UserContext)
    const { currentUser } = useContext(UserContext)

    const handleForm = async (e) => {
        e.preventDefault()

        try {
            const cred = await signIn(
                inputs.current[0].value,
                inputs.current[1].value
            )
            formRef.current.reset();
            setValidation("")
            navigate("/")
        } catch (err) {
            setValidation("Please try again")
        }
    }

    const resetForm = () => {
        setValidation("")
        formRef.current.reset()
    }

    return (
        <div className="container">

            {currentUser ? <PrivateHome /> :
                <div className="d-flex row justify-content-center">

                    <div className="col-lg-6 align-center">
                        <h1 className="display-4 text-light m-5 p-5">
                            Welcome !
                            <nav className="display-6 nav text-light">
                                <p className="text-light my-2">First Sign In or</p>
                                <Link to="/sign-up" className="h-75">
                                    <button className="btn btn-primary ms-3 h-75 my-3">
                                        Sign Up
                                    </button>
                                </Link>
                            </nav>
                        </h1>
                    </div>

                    <div
                        className="col-lg-3 my-5 pb-3 bg-light py-5 card w-50"
                        style={{ minWidth: "400px" }}>
                        <div className="modal-dialog w-75 mx-5">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <Link to="/sign-up" className="navbar-brand">
                                        <h5 className="modal-title text-primary">Sign Up with<i className="bi bi-google mx-3"></i></h5>
                                    </Link>
                                </div>

                                <div className="d-flex text-center flex-row">
                                    <hr className="col-5 mt-3 mb-1" />
                                    <p className="col-2 mt-1 mb-1 text-secondary">or</p>
                                    <hr className="col-5 mt-3 mb-1" />
                                </div>

                                <div className="modal-body">
                                    <h5 className="modal-title mb-3 text-black">Sign In</h5>
                                    <form ref={formRef} onSubmit={handleForm}
                                        className="sign-up-form">
                                        <div className="mb-3">
                                            <label htmlFor="signInEmail">Email address</label>
                                            <input ref={addInputs} name="email" required type="email" className="form-control mt-1" placeholder="your email address..." />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="signInPwd">Password</label>
                                            <input ref={addInputs} name="pwd" required type="password" className="form-control mt-1" placeholder="your password..." />
                                            <p className="text-danger mt-1">{validation}</p>
                                        </div>
                                        <div className="d-flex flex-row">
                                            <button className="btn btn-primary w-50 mx-2 mb-4">Log In</button>
                                            <button onClick={resetForm} className="btn btn-primary w-50 mx-2 mb-4">Reset form</button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                        
                    </div>
                </div>
            }

        </div>
    );
}