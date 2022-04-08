import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import classNames from "classnames";
import AuthService from "../services";
import { useForm } from "react-hook-form";
import SuperAdminHeader from "./../components/SuperAdminHeader";
const AddStaff = (props) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [stateForm, setStateForm] = useState({
        licenseNo: "",
        cellphone: "",
        type: "admin",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState({ error: false, message: "" });

    // If user is already authenticated we redirect to entry location.
    const { isAuthenticated } = props;

    const onHandleTelephoneChange = (e) => {
        const { name, value } = e.target;
        let telephone = value;
        if (!Number(telephone) && value !== "") {
            return;
        }
        setStateForm({
            ...stateForm,
            [name]: value,
        });
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
        const {
            email,
            cellphone,
            type,
            password,
            licenseNo,
            password_confirmation,
        } = stateForm;
        const credentials = {
            licenseNo,
            email,
            cellphone,
            type,
            password,
            password_confirmation,
        };
        setLoading(true);
        submit(credentials);
    };

    const submit = (credentials) => {
        console.log(credentials);
        props
            .dispatch(AuthService.register(credentials))
            .then(setSuccess(true))
            .catch((err) => {
                console.log(err);
                const errorsCredentials = Object.values(err.errors);
                errorsCredentials.join(" ");
                const responses = {
                    error: true,
                    message: errorsCredentials[0],
                };
                setResponse(responses);
                setLoading(false);
                setSuccess(false);
            });
    };
    return (
        <>
            {/* {isAuthenticated && <Redirect to="/" replace />} */}
            <SuperAdminHeader />
            <div className="d-flex flex-column flex-row align-content-center py-5">
                <div className="container">
                    <div className="row">
                        <div className="section-login col-lg-6 ml-auto mr-auto">
                            <h4>Add a New Admin</h4>

                            <div className="card-login card mb-3">
                                <div className="card-body">
                                    {response.error && (
                                        <div
                                            className="alert alert-danger text-center"
                                            role="alert"
                                        >
                                            {response.message}
                                        </div>
                                    )}

                                    {success && (
                                        <div
                                            className="alert alert-success text-center"
                                            role="alert"
                                        >
                                            Registration successful.
                                            <br />
                                            
                                            <Link to="/add-staff" href="/add-staff" onClick={() => window.location.reload(false)}>
                                                Add Another Admin
                                            </Link>
                                        </div>
                                    )}

                                    {!success && (
                                            <form
                                            className="form-horizontal"
                                            method="POST"
                                            onSubmit={handleSubmit(onSubmit)}
                                            >
                                            <div className="form-group">
                                                <label htmlFor="name">
                                                    Staff Number
                                                </label>
                                                <input
                                                    id="licenseNo"
                                                    type="licenseNo"
                                                    maxLength={100}
                                                    name="licenseNo"
                                                    value={stateForm.licenseNo}
                                                    className={classNames(
                                                        "form-control",
                                                        {
                                                            "is-invalid":
                                                                "licenseNo" in
                                                                errors,
                                                        }
                                                    )}
                                                    placeholder="Enter Staff No"
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

                                            <div className="form-group">
                                                <label htmlFor="email">
                                                    Email Address
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    maxLength={50}
                                                    value={stateForm.email}
                                                    className={classNames(
                                                        "form-control",
                                                        {
                                                            "is-invalid":
                                                                "email" in
                                                                errors,
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
                                                    maxLength={15}
                                                    minLength={6}
                                                    value={stateForm.password}
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
                                                <label htmlFor="password_confirmation">
                                                    Password Confirmation
                                                </label>
                                                <input
                                                    id="password_confirmation"
                                                    type="password"
                                                    maxLength={15}
                                                    minLength={6}
                                                    value={
                                                        stateForm.password_confirmation
                                                    }
                                                    className={classNames(
                                                        "form-control",
                                                        {
                                                            "is-invalid":
                                                                "password_confirmation" in
                                                                errors,
                                                        }
                                                    )}
                                                    name="password_confirmation"
                                                    placeholder="Confirm password"
                                                    required
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={loading}
                                                    ref={register({
                                                        required: true,
                                                    })}
                                                />
                                                {errors.password_confirmation && (
                                                    <span className="invalid-feedback">
                                                        This field is required
                                                    </span>
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="cellphone">
                                                    Phone Number
                                                </label>
                                                <input
                                                    id="cellphone"
                                                    type="text"
                                                    name="cellphone"
                                                    value={stateForm.cellphone}
                                                    maxLength={10}
                                                    minLength={7}
                                                    className={classNames(
                                                        "form-control",
                                                        {
                                                            "is-invalid":
                                                                "cellphone" in
                                                                errors,
                                                        }
                                                    )}
                                                    placeholder="Phone Number"
                                                    required
                                                    onChange={
                                                        onHandleTelephoneChange
                                                    }
                                                    onBlur={handleBlur}
                                                    disabled={loading}
                                                    ref={register({
                                                        required: true,
                                                    })}
                                                />
                                                {errors.cellphone && (
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
                                                            "btn-loading":
                                                                loading,
                                                        }
                                                    )}
                                                >
                                                    Add Staff
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

AddStaff.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(AddStaff);



