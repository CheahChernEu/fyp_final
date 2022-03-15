import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import AuthService from "../services";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import logo from "../assets/logo.png";
import AdminHeader from "./../components/AdminHeader";
import { set } from "lodash";

const Home = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [stateForm, setStateForm] = useState({
        email: "",
        password: "",
        licenseNo: "",
    });

    const [res, setRes] = useState({});

    const [userData, setUserData] = useState({
        id: "",
        licenseNo: "",
        type: "",
    });

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        licenseNo: "",
    });

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ error: false, message: "" });

    console.log("Ressss", res.type);
    const { from } =
        res.type === "user"
            ? props.location.state || {
                  from: { pathname: "/owner" },
              }
            : props.location.state || {
                  from: { pathname: "/admin" },
              };

    const { isAuthenticated } = props;

    const navigation = () => {
        console.log(res.type);
        if (res.type === "admin") {
            return (
                props.location.state || {
                    from: { pathname: "/admin" },
                }
            );
        } else if (res.type === "user") {
            return (
                props.location.state || {
                    from: { pathname: "/owner" },
                }
            );
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateForm({
            ...stateForm,
            [name]: value,
        });
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        // Avoid validation until input has a value.
        if (value === "") {
            return;
        }
    };

    const onSubmit = () => {
        // e.preventDefault();
        console.log({ stateForm });
        const { email, password, licenseNo } = stateForm;
        setCredentials({
            email,
            password,
            licenseNo,
        });
        setLoading(true);
    };

    useEffect(() => {
        if (!credentials) return;
        let isSubscribed = true;
        props
            .dispatch(AuthService.login(credentials))
            .then((response) => {
                isSubscribed ? setRes(response) : null;
            })
            .catch((err) => {
                const errorsCredentials = Object.values(err.errors);
                errorsCredentials.join(" ");
                const responses = {
                    error: true,
                    message: errorsCredentials[0],
                };
                setLoading(false);
            });
        return () => (isSubscribed = false);
    }, [credentials]);


    return (
        <>
            {isAuthenticated && typeof res.type !== "undefined" && (
                <Redirect to={from} />
            )}
            <AdminHeader />
            <div className="d-flex flex-column flex-md-row align-items-md-center py-5">
                <div className="container">
                    <div className="row">
                        <div className="section-about col-lg-6 mb-1 mb-lg-0">
                            <div>
                                <img
                                    src={logo}
                                    className="rounded-circle "
                                    alt="Logo"
                                ></img>
                                <h2
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    Welcome to F_Truck
                                </h2>
                                <p
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    F_Truck brings you happiness everyday!
                                </p>
                            </div>
                        </div>
                        <div className="section-login col-lg-6">
                            <h4>F_Truck Login</h4>

                            <div className="card-login card mb-3">
                                <div className="card-body">
                                    <form
                                        className="form-horizontal"
                                        method="POST"
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        {response.error && (
                                            <div
                                                className="alert alert-danger"
                                                role="alert"
                                            >
                                                Credentials were incorrect. Try
                                                again!
                                            </div>
                                        )}

                                        <div className="form-group">
                                            <label htmlFor="email">
                                                Email Address
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                maxLength={50}
                                                className={classNames(
                                                    "form-control",
                                                    {
                                                        "is-invalid":
                                                            "email" in errors,
                                                    }
                                                )}
                                                placeholder="Enter email e.g. username@gmail.com"
                                                required
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={loading}
                                                ref={register({
                                                    required: true,
                                                })}
                                            />
                                            {errors.email && (
                                                <span className="invalid-feedback">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">
                                                Password
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                maxLength={15}
                                                minLength={6}
                                                className={classNames(
                                                    "form-control",
                                                    {
                                                        "is-invalid":
                                                            "password" in
                                                            errors,
                                                    }
                                                )}
                                                name="password"
                                                placeholder="Enter password"
                                                required
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={loading}
                                                ref={register({
                                                    required: true,
                                                })}
                                            />
                                            {errors.password && (
                                                <span className="invalid-feedback">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="licenseNo">
                                                License Number/Staff Number
                                            </label>
                                            <input
                                                id="licenseNo"
                                                type="text"
                                                maxLength={15}
                                                minLength={6}
                                                className={classNames(
                                                    "form-control",
                                                    {
                                                        "is-invalid":
                                                            "licenseNo" in
                                                            errors,
                                                    }
                                                )}
                                                name="licenseNo"
                                                placeholder="Enter licenseNo"
                                                required
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={loading}
                                                ref={register({
                                                    required: true,
                                                })}
                                            />
                                            {errors.licenseNo && (
                                                <span className="invalid-feedback">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>

                                        <div className="form-group text-center">
                                            <button
                                                type="submit"
                                                className={classNames(
                                                    "btn btn-primary",
                                                    {
                                                        "btn-loading": loading,
                                                    }
                                                )}
                                            >
                                                Sign In
                                            </button>
                                        </div>

                                        <div className="login-invite-text text-center">
                                            {"Don't have an account?"}
                                            <Link to="/register">Register</Link>
                                            .
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="password-reset-link text-center">
                                <Link to="/forgot-password">
                                    Forgot Your Password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Home.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});
export default connect(mapStateToProps)(Home);
