import React, {useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import {useDispatch, useSelector} from "react-redux";
import {fetchReferedUser} from "../../features/apiSlice";
import MiniLoader from "../components/MiniLoader";

export default function ReferredUsersPage({props}) {
  const dispatch = useDispatch();
  const [referUser, setReferUser] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) dispatch(fetchReferedUser(userId));
  }, [dispatch, userId]);

  const referedUser = useSelector((state) => state.api.referedUser);
  const referedUserLoading = useSelector(
    (state) => state.api.referedUserLoading
  );

  useEffect(() => {
    if (Object.keys(referedUser).length) {
      const sorted = referedUser.referredUsers.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setReferUser(sorted);
    }
  }, [userId, referedUser]);

  return (
    <>
      <title>Referred Users - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"referredusers"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card card-table p-0">
                    <div className="card-header py-3 px-4">
                      <h5 className="mb-0 fs-5">Reffered Users</h5>
                    </div>
                    <div className="card-body p-0 table-responsive">
                      <table className="table table-bordered withdraw-table">
                        <thead>
                          <tr>
                            <th>S.No.</th>
                            <th>Full Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Mobile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {referUser.map((user, index) => (
                            <tr key={user.id} className="acc">
                              <td>{index + 1}</td>
                              <td>
                                {user.fname} {user.lname}
                              </td>
                              <td>{user.userName}</td>
                              <td>{user.email}</td>
                              <td>{user.mobileNo}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div>{referedUserLoading && <MiniLoader />}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer props={""} />
    </>
  );
}
