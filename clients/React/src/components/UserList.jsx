import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, page, totalPages } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    dispatch(fetchUsers(newPage));
  };

  return (
    <div className="container mt-4">
      <h2>User List</h2>
      <div className="table-responsive">
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Age</th><th>Address</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((user) => (
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
