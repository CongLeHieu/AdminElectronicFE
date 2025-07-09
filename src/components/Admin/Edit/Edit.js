import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import "./Edit.scss";
import { MainAPI } from "../../API";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Edit() {
  const { id } = useParams();
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState([]);

  console.log(user);
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch(`${MainAPI}/Admins/${id}`, {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          username: data.username,
          email: data.email,
        });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${MainAPI}/Admins/${id}`,
        { ...user, role: role },
        {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("accessToken")),
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          nav("/admin/user");
        }, 2000);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  const specificError = (name) => {
    return errors.find((err) => {
      return err.name === name;
    });
  };

  return (
    <div className="edit-container d-flex">
      <ToastContainer />
      <NavBar />
      <div className="form-content">
        <div className="form-wrapper shadow rounded p-5">
          <h2 className="text-center text-primary mb-4">Edit User</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 item">
              <label htmlFor="name" className="form-label fw-bold">
                Tên đầy đủ
              </label>
              <div className="form-control">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control-item"
                  placeholder="Nhập tên đăng nhập"
                  value={user.username}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      username: e.target.value,
                    });
                  }}
                />
              </div>
              {specificError("username") && (
                <div className="text-danger mt-1 fw-bold">
                  {specificError("username").message}
                </div>
              )}
            </div>

            <div className="mb-3 item">
              <label htmlFor="email" className="form-label fw-bold">
                Email
              </label>
              <div className="form-control">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control-item"
                  placeholder="Nhập email"
                  value={user.email}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              {specificError("email") && (
                <div className="text-danger mt-1 fw-bold">
                  {specificError("email").message}
                </div>
              )}
            </div>

            <div className="mb-3 item">
              <label htmlFor="phone" className="form-label fw-bold">
                Số điện thoại
              </label>
              <div className="form-control">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-control-item"
                  placeholder="Nhập số điện thoại"
                  value={user.phoneNumber}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      phoneNumber: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="mb-4 item">
              <label htmlFor="role" className="form-label fw-bold">
                Vai trò
              </label>
              <div className="form-control">
                <select
                  id="role"
                  className="form-control-item"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="staff">Staff</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
            </div>

            <div className="action-btn">
              <button
                type="button"
                className="btn btn-outline-secondary me-3"
                onClick={() => nav("/admin/user")}
              >
                Hủy
              </button>
              <button type="submit" className="btn btn-primary">
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
