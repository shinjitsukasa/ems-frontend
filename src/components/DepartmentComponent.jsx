import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from "../services/DepartmentService";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  const navigator = useNavigate();

  // populate the text inputs when update button is clicked
  useEffect(() => {
    if (id) {
      getDepartmentById(id)
        .then((response) => {
          setDepartmentName(response.data.departmentName);
          setDepartmentDescription(response.data.departmentDescription);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const validateForm = () => {
    console.log("form validation..");
    const errors = {};
    let valid = true;

    if (!departmentName) {
      errors.departmentName = "Department name is required.";
      valid = false;
    }

    if (!departmentDescription) {
      errors.departmentDescription = "Department description is required.";
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  function saveOrUpdateDepartment(e) {
    e.preventDefault();

    if (validateForm()) {
      const department = {
        departmentName,
        departmentDescription,
      };

      console.log(department);

      if (id) {
        updateDepartment(id, department)
          .then((response) => {
            console.log(response.data);
            navigator("/departments");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createDepartment(department)
          .then((response) => {
            console.log(response.data);
            navigator("/departments");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
    }
  }

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offst-md-3 offset-md-3">
          {pageTitle()}

          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Department Name:</label>
                <input
                  type="text"
                  name="departmentName"
                  placeholder="Enter Department Name"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className={` form-control ${
                    errors.departmentName ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.departmentName && (
                  <div className="invalid-feedback">
                    {errors.departmentName}{" "}
                  </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Department Description:</label>
                <input
                  type="text"
                  name="departmentDescription"
                  placeholder="Enter Department Description"
                  value={departmentDescription}
                  onChange={(e) => setDepartmentDescription(e.target.value)}
                  className={` form-control ${
                    errors.departmentDescription ? "is-invalid" : ""
                  }`}
                ></input>
                {errors.departmentDescription && (
                  <div className="invalid-feedback">
                    {errors.departmentDescription}{" "}
                  </div>
                )}
              </div>

              <button
                className="btn btn-success mb-2"
                onClick={(e) => saveOrUpdateDepartment(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentComponent;
