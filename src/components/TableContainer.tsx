import "./TableContainer.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface ContainerProps {}

const TableContainer: React.FC<ContainerProps> = () => {
  const [contact, setContact] = useState([]);
  const history = useHistory();
  const getContact = () => {
    fetch(`https://paripornaform.herokuapp.com/employee`)
      .then((data) => data.json())
      .then((a) => setContact(a.data));
    console.log("contact", contact);
  };
  useEffect(getContact, []);
  const deleteEmployee = (id: any) => {
    fetch(`https://paripornaform.herokuapp.com/employee/${id}`, {
      method: "DELETE",
    }).then(() => getContact());
  };
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contact.map(({ _id, name, phone, email }) => (
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              <td>{phone}</td>

              <td>
                {" "}
                <button
                  className="editbutton"
                  onClick={() => {
                    console.log(_id);
                    history.push(`employee/edit/${_id}`);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteEmployee(_id)}
                  className="deletebutton"
                  style={{ marginLeft: "20px" }}
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

export default TableContainer;
