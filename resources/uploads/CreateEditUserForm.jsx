import React from "react";
import { getUsers, register, updateUser } from "../services/users";
import { handleChange } from "../utils/handleChange";
import { useState } from "react";
import { ROLES } from "../constants/config";
import { getCookie } from "../utils/getCookie";
import { useNavigate } from "react-router-dom";
import { useUsersContext } from "../context/users/usersContext";

const CreateEditFormUser = ({ title, type, form, setForm, user_id }) => {
  const navigate = useNavigate();
  const cookie = getCookie("token");
  const { getUsers } = useUsersContext()
  //console.log("cookie", cookie.length);
  //console.log("type",type)
  const [message, setMessage] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("from frontend",form.email);
    // console.log(form.password);
    //console.log("type", type);
    try {
      if (type === "register") {
       const response = await register({ ...form });
       //console.log("response: ", response.message)
       if(response.status === 200) {
        setMessage("Saved Successfully!!");
        getUsers()
        navigate('/users')
       }
       else{
        setMessage(response?.message);
       }
      } else if (type === "edit") {
        updateUser(user_id, { ...form });
        navigate('/users')
      }

    } catch (e) {
      setMessage(e.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="register-form">
      {message && <p className="error">{message}</p>}
        <h1>{title}</h1>
        <br />
        <label htmlFor="username">Username: </label>
        <input
          value={form.username}
          onChange={(e) => handleChange(e, setForm, form)}
          type="text"
          placeholder="enter user name"
          name="username"
        ></input>
        <br />
        {type === "register" && (
          <>
            <label htmlFor="password">Password: </label>
            <input
              value={form.password}
              onChange={(e) => handleChange(e, setForm, form)}
              type="text"
              placeholder="enter password"
              name="password"
              required
            ></input>
          </>
        )}
        {((type === "register" && cookie) || type === "edit") && (
          <>
            <label htmlFor="role">Role: </label>
            <select
              value={form.role}
              onChange={(e) => handleChange(e, setForm, form)}
              type="text"
              name="role"
              required
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </>
        )}
        <br />
        <label htmlFor="firstname">First Name: </label>
        <input
          value={form.firstname}
          onChange={(e) => handleChange(e, setForm, form)}
          type="text"
          placeholder="enter first name"
          name="firstname"
          required
        ></input>
        <br />
        <label htmlFor="lastname">Last Name: </label>
        <input
          value={form.lastname}
          onChange={(e) => handleChange(e, setForm, form)}
          type="text"
          placeholder="enter last name"
          name="lastname"
          required
        ></input>
        <br />
        <label htmlFor="email">Email: </label>
        <input
          value={form.email}
          onChange={(e) => handleChange(e, setForm, form)}
          type="email"
          placeholder="enter email"
          name="email"
          required
        ></input>
        <br />
        <button type="submit">Submit</button>
        <br />
      </form>
    </>
  );
};

export default CreateEditFormUser;
