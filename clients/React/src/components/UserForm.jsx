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

  // ✅ FIXED: use selectedUser instead of searching in list
  const user = useSelector((state) => state.users.selectedUser);

  useEffect(() => {
    if (id && !user) {
      dispatch(getUser(id)).then((res) => {
        if (res.payload) {
          // ✅ SAFELY update only known fields
          setForm((prev) => ({
            ...prev,
            name: res.payload.name || "",
            email: res.payload.email || "",
            age: res.payload.age || "",
            adress: res.payload.adress || "",
            password: res.payload.password || "",
          }));
        }
      });
    } else if (user) {
      // ✅ If already present in store
      setForm((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        adress: user.adress || "",
        password: user.password || "",
      }));
    }
  }, [id, user, dispatch]);

  // ✅ Optional: Clear selectedUser on unmount
  useEffect(() => {
    return () => {
      dispatch({ type: "users/clearSelectedUser" }); // <-- implement this in slice
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateUser({ id, userData: form }));
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
              // ✅ FIXED: ensure value is never undefined
              value={form[field] ?? ""}
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
