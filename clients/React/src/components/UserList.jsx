import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, page, totalPages } = useSelector((state) => state.users);

  // 🔍 Local state to manage search input
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    dispatch(fetchUsers(newPage));
  };

  // 🔍 Filter users by name, email, or address based on search term
  const filteredUsers = list.filter((user) =>
    [user.name, user.email, user.adress]
      .some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mt-4">
      <h2>User List</h2>

      {/* 🔍 Search Box */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Age</th><th>Address</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.adress}</td>
                <td>
                  <button className="btn btn-danger btn-sm me-2" onClick={() => dispatch(deleteUser(user._id))}>
                    Delete
                  </button>
                  <button className="btn btn-warning btn-sm" onClick={() => navigate(`/add/${user._id}`)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr><td colSpan="5" className="text-center text-muted">No matching users found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map((_, index) => (
            <li key={index} className={`page-item ${page === index + 1 ? "active" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
