import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CreateEditFormUser from "../../components/CreateEditUserForm";
import { getUser } from "../../services/users";
import { FaArrowLeft } from "react-icons/fa";

export default function EditUser(props) {
  //form that will hold fields with setter
  const [form, setForm] = useState({
    username: "",
    role: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  //getting id from parameters
  const { id } = useParams();
  // const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});

  useEffect(() => {
    const user = getUser(id).then((user) => {
     // console.log("user: ", user);
      setForm(user.data);
    });
  }, [id]);
 
  return (
    <div className="forms">
      <CreateEditFormUser
        title={"edit"}
        type="edit"
        form={form}
        setForm={setForm}
        user_id={id}
      />
      <Link className="link-button" to="/users">
        Go back to list
        <FaArrowLeft />
      </Link>
    </div>
  );
}
