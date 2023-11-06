import React, { useState, useEffect } from "react";
import { deleteDepartment, getAllDepartments } from "../services/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    displayAllDepartments();
  }, []);

  function displayAllDepartments() {
    getAllDepartments().then((response) => {
      setDepartments(response.data);
    }).catch((error) => {
      console.error(error);
    })
  }

  function updateDepartment(id) {
    navigator(`/edit-department/${id}`)
  }

  function removeDepartment(id) {
    console.log(id);

    deleteDepartment(id).then((response) => {
      displayAllDepartments() // repopulate department list
    }).catch(error => {
      console.error(error);
    })
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Departments</h2>
      <Link to="/add-department" className="btn btn-primary mb-2">
        Add Department
      </Link>
      <table className="table table-success table-striped table-bordered">
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => updateDepartment(department.id)}
                  style={{ marginRight: "10px" }}
                >
                  Update
                </button>

                <button
                  className="btn btn-warning"
                  onClick={() => removeDepartment(department.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartmentComponent;
