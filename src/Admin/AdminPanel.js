import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAdmin, fetchAdmins } from "../redux/slices/adminSlice";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const AdminRap = styled.div`
 width: 100%;

h4 {
  font-size: 16px;
  font-weight: 600;
}
h5 {
  font-size: 14px;
  font-weight: 500;
}
p {
  font-size: 14px;
  font-weight: 400;
}
th {
  font-size: 14px;
  font-weight: 500;
  color: #727789;
}
td {
  font-size: 13px;
  font-weight: 400;
  color: #727789;
}
label {
  font-size: 14px !important;
  color: #60667a;
  font-weight: 600;
}
.star {
  font-weight: 700;
  color: red;
}
.client-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    margin-bottom: 15px;
  }
  .client-link {
    padding: 20px 20px;
    text-decoration: none;
    color: #727789;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent; /* Default underline */
    transition: all 0.3s ease;
  }
  .client-link.active {
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid black; /* Black underline for the active link */
    color: #030b26;
  }

  .client-link:hover {
    color: #555; /* Optional hover effect */
  }
  .client-link-container {
    display: flex;
    justify-content: flex-start;
  }
  .create-new-client {
    width: 128px;
    height: 38px;
    border-radius: 6px;
    background: #12d27d;
    color: #ffffff;
    text-decoration: none;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .client-dropdown-container {
    position: fixed;
    width: 100vw;
    min-height: 100vh;
    display: flex;

    justify-content: flex-end;

    background: rgba(0, 0, 0, 0.3); /* Semi-transparent dark background */
    backdrop-filter: blur(1px); /* Adds a blur effect */
    z-index: 9999;
    top: 0;
    left: 0;
    bottom: 0px;
  }
  .client-dropdown-container.hidden {
    display: none;
  }
  .client-all-dropdown-div {
    width: 430px;
    overflow-y: auto;
    top: 18px;
    right: 18px;
    min-height: 546px;
    margin-right: 20px;
    border: 1px solid #d0d5dd;
    border-radius: 10px;

    background: #ffffff;
    padding-bottom: 15px;
    display: flex;
    font-size: 12px;
    font-weight: 500;
    color: #60667a;
    flex-direction: column;
    gap: 15px;
    z-index: 1000;
  }
  .client-dropdown-header {
    display: flex;
    height: 55px;
    justify-content: space-between;
    align-items: center;
    background: #f7f7f8;
    border-bottom: 1px solid #d0d5dd;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    padding: 5px 15px;
  }
  .client-dropdown-div {
    padding: 15px;
    display: flex;

    flex-direction: column;
    gap: 15px;
    padding-bottom: 20px;
  }
  .client-all-dropdown-div input,
  .client-all-dropdown-div select {
    width: 380px !important;
    height: 45px !important;
    border: 1px solid #dbe0ee;
    border-radius: 10px !important;
    margin-top: 10px !important;
    padding-left: 10px !important;
  }
form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 10px;
}

.client-create-btn {
    background: #0c1d55;
    width: 185px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    border-style: none;
  }
`;
const AdminForm = () => {
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState("cso");
    const [dropdownVisible, setDropdownVisible] = useState(false);
  const { admins, loading } = useSelector((state) => state.admin);
const [isLoading, setIsLoding] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    assignedRole: ""
  });
console.log(admins);

  const isValid = formData.firstName !== "" &&
                 formData.lastName !== "" &&
                 formData.email !== "" &&
                 formData.password !== "" &&
                 formData.gender !== "" &&
                 formData.assignedRole !== "" &&
                 formData.phone !== "" 

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAdmin(formData));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
     
      password: "",
      gender: "",
      assignedRole: ""
    });
    setDropdownVisible(!dropdownVisible);

  };

  return (
    <AdminRap>
      <div>
        <div className="client-1">
          <div className="client-link-container">
            <Link
              className={`client-link ${activeLink === "cso" ? "active" : ""}`}
              onClick={() => handleLinkClick("cso")}
            >
              Admin Members
            </Link>
          </div>
          <div>
            <Link onClick={toggleDropdown} className="create-new-client">
              Add New Admin
            </Link>
          </div>

          <div
            className={`client-dropdown-container ${
              dropdownVisible ? "" : "hidden"
            }`}
            style={{ marginTop: "10px" }}
          >
            <div className="client-all-dropdown-div">
              <div className="client-dropdown-header">
                <h4>Add New Member</h4>
                <Icon
                  onClick={() => setDropdownVisible(false)}
                  icon="uil:times"
                  width="16"
                  height="16"
                  style={{ color: "black", cursor: "pointer" }}
                />
              </div>

              <form onSubmit={handleSubmit}>
                  <label>
                    First Name<span className="star">*</span> <br />
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      value={formData.firstName}
                      required
                    />
                  </label>
                  <label>
                    Last Name<span className="star">*</span> <br />
                    <input

                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      value={formData.lastName}
                      required
                    />
                  </label>
                <label>
                  Email Address<span className="star">*</span> <br />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </label>
                <label>
                  Phone Number<span className="star">*</span> <br />
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    required
                  />
                </label>
                <label>
                  Password<span className="star">*</span> <br />
                  <input
                    type="text"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                </label>
                <label>
                  Gender<span className="star">*</span> <br />
                  <select
                    name="gender"
                    onChange={handleChange}
                    value={formData.gender}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label>
                  Assigned Role<span className="star">*</span> <br />
                  <select
                    name="assignedRole"
                    onChange={handleChange}
                    value={formData.assignedRole}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Manager">Manager</option>
                    <option value="Disbursement Officer">Disbursement Officer</option>

                  </select>
                </label>
                <div className="save-cancel-div">
                <button
                    className="client-create-btn"
                    onClick={handleSubmit}
                    disabled={!isValid}
                    style={{
                      backgroundColor: isValid ? "#0c1d55" : "#727789",
                      cursor: !isValid ? "not-allowed" : "pointer",
                    }}
                  >
                    {isLoading ? (
                      <>
                        <PulseLoader color="white" size={10} />
                      </>
                    ) : (
                      "Save"
                    )}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
        {activeLink === "cso" && 
<div className="find-lawyer-header">
 <div className="table-container">
                <div className="new-table-scroll">
                  <div className="table-div-con">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th style={{ width: "30px" }}>
                            <input type="checkbox" />
                          </th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Gender</th>
                          <th>Assigned Role</th>
                         
                        </tr>
                      </thead>
                      <tbody>
                        {admins ? (
                          admins.map((caseItem) => (
                            <tr
                              key={caseItem?.id}
                            >
                              <td>
                                <input
                                  type="checkbox"
                                 
                                />
                              </td>
                              <td>
                                {caseItem?.firstName} {caseItem?.lastName}
                              </td>
                              <td>{caseItem?.email}</td>
                              <td>{caseItem?.phone}</td>
                              <td>{caseItem?.gender}</td>
                              <td>{caseItem?.assignedRole}</td>
                             
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="10" className="no-case">
                              <img src="/images/mask_img.png" alt="" />
                              <h3>No cso found.</h3>
                              <p style={{}}></p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
               

               
              </div>
</div>
}

        </div>
      </div>
    </AdminRap>
  );
};

export default AdminForm;
