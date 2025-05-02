import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUser, updateUser } from "../redux/userSlice";
import { useParams, useNavigate } from "react-router-dom";

export default function UserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    adress: "",
    password: "",
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) =>
    state.users.list.find((user) => user._id === id)
  );

  useEffect(() => {
    if (id && !user) {
      dispatch(getUser(id)).then((res) => {
        if (res.payload) {
          setForm(res.payload);
        }
      });
    } else if (user) {
      setForm(user);
    }
  }, [id, user, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateUser({ id, data: form }));
    } else {
      dispatch(createUser(form));
    }
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit" : "Add"} User</h2>
      <form onSubmit={handleSubmit}>
        {["name", "email", "age", "adress", "password"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type={
                field === "password"
                  ? "password"
                  : field === "age"
                  ? "number"
                  : "text"
              }
              name={field}
              className="form-control"
              value={form[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="btn btn-primary">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
