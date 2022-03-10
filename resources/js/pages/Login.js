import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import classNames from "classnames";
import AuthService from "../services";
import { useForm } from "react-hook-form";
import AdminHeader from "./../components/AdminHeader";

const Login = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [stateForm, setStateForm] = useState({
        email: "",
        password: "",
        licenseNo: "",
    });
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState({ error: false, message: "" });

    // If user is already authenticated we redirect to entry location.
    const { from } = props.location.state || { from: { pathname: "/owner" } };
    const { isAuthenticated } = props;

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
        //e.preventDefault();
        const { email, password, licenseNo } = stateForm;
        const credentials = {
            email,
            password,
            licenseNo,
        };
        setLoading(true);

        submit(credentials);
    };

    const submit = (credentials) => {
        props.dispatch(AuthService.login(credentials)).catch((err) => {
            // console.log(err);
            const errorsCredentials = Object.values(err.errors);
            errorsCredentials.join(" ");
            const responses = {
                error: true,
                message: errorsCredentials[0],
            };
            setResponse(responses);
            setLoading(false);
        });
    };

    return (
        <>
            {isAuthenticated && <Redirect to={from} />}
            <AdminHeader />
            <div className="d-flex flex-column flex-row align-content-center py-5">
                <div className="container">
                    <div className="row">
                        <div className="section-login col-lg-6 ml-auto mr-auto">
                            <h4>F_Truck Login</h4>

                            <div className="card-login card mb-3">
                                <div className="card-body">
                                    {response.error && (
                                        <div
                                            className="alert alert-danger text-center"
                                            role="alert"
                                        >
                                            Credentials were incorrect. Try
                                            again!
                                        </div>
                                    )}

                                    <form
                                        className="form-horizontal"
                                        method="POST"
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
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
                                                placeholder="Enter email"
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
                                                maxLength={15}
                                                minLength={6}
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
                                            No account?{" "}
                                            <Link
                                                to="/register"
                                                href="/register"
                                            >
                                                Register
                                            </Link>
                                            .
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="password-reset-link text-center">
                                <Link
                                    to="/forgot-password"
                                    href="/forgot-password"
                                >
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

Login.defaultProps = {
    location: {
        state: {
            pathname: "/home",
        },
    },
};

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(Login);
