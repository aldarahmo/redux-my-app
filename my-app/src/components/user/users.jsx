import React from "react";
import { useEffect, useState } from "react";
import {
  loadUsersAsync,
  selectUsers,
  deleteUseAsync,
  selectUsersLoaded,
  selectStatus,
} from "../../features/counter/users_slice";
import { useDispatch, useSelector } from "react-redux";
import RenderError from "../render_error";

export function Users() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const status = useSelector(selectStatus);
  const [errorMessage, setErrorMessage] = useState(null);
  const loaded = useSelector(selectUsersLoaded);

  useEffect(() => {
    if (!loaded) {
      dispatch(loadUsersAsync());
    }
  }, [dispatch, loaded]);

  return (
    <div>
      <div className="container">
        <h2>Users</h2>
        <RenderError errorMessage={errorMessage} />
        <table className="table">
          <thead>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>gender</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button
                      className={`btn btn-${
                        user.status === status ? "success" : "danger"
                      }`}
                    >
                      {user.status}
                    </button>
                    {/* <button className="btn btn-primary">{user.status}</button> */}
                  </td>
                  <td>
                    <a
                      onClick={() => {
                        dispatch(
                          deleteUseAsync(
                            user.id,
                            () => {},
                            (error) => {
                              setErrorMessage(error.message);
                            }
                          )
                        );
                      }}
                    >
                      <i className="glyphicon glyphicon-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
