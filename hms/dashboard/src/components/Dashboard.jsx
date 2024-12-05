import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const fetchAppointments = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:4000/api/v1/appointment/getall",
                { withCredentials: true }
            );
            // console.log("ajay");
            setAppointments(data.appointments);
        } catch (error) {
            setAppointments([]);
            console.log("some error occured while fetching appointments", error);
        }
    };
    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleUpdateStatus = async (appointmentId, status) => {
        try {
            const { data } = await axios.put(
                `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
                { status },
                { withCredentials: true }
            );
            fetchAppointments();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    const handleDeleteStatus = async (appointmentId) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:4000/api/v1/appointment/delete/${appointmentId}`,
                { withCredentials: true }
            );
            fetchAppointments();
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    const { isAuthenticated, admin } = useContext(Context);
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <>
            <section className="dashboard page">
                <div className="banner">
                    <div className="firstBox">
                        <img src="/doc.png" alt="docImg" />
                        <div className="content">
                            <div>
                                <p>Hello ,</p>
                                <h5>
                                    {admin &&
                                        `${admin.firstName} ${admin.lastName}`}{" "}
                                </h5>
                            </div>
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                                Assumenda repellendus necessitatibus itaque.
                            </p>
                        </div>
                    </div>
                    <div className="secondBox">
                        <p>Total Appointments</p>
                        <h3>{appointments.length}</h3>
                    </div>
                    <div className="thirdBox">
                        <p>Registered Doctors</p>
                        <h3>20</h3>
                    </div>
                </div>
                <div className="banner">
                    <h5>Appointments</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Department </th>
                                <th>Status</th>
                                <th>Visited</th>
                                <th>delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments && appointments.length > 0
                                ? appointments.map((appointment) => {
                                    return (
                                        <tr key={appointment._id}>
                                            <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                                            <td>{appointment.appointment_date.substring(0, 16)}</td>
                                            <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                                            <td>{appointment.department}</td>
                                            <td>
                                                <select
                                                    className={
                                                        appointment.status === "Pending"
                                                            ? "value-pending"
                                                            : appointment.status === "Accepted"
                                                                ? "value-accepted"
                                                                : "value-rejected"
                                                    }
                                                    value={appointment.status}
                                                    onChange={(e) =>
                                                        handleUpdateStatus(appointment._id, e.target.value)
                                                    }
                                                >
                                                    <option value="Pending" className="value-pending">
                                                        Pending
                                                    </option>
                                                    <option value="Accepted" className="value-accepted">
                                                        Accepted
                                                    </option>
                                                    <option value="Rejected" className="value-rejected">
                                                        Rejected
                                                    </option>
                                                </select>
                                            </td>
                                            <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green" /> : <AiFillCloseCircle className="red" />}</td>
                                            <td>
                                                <MdDelete className="jk" onClick={(e) =>
                                                    handleDeleteStatus(appointment._id)
                                                } />
                                            </td>
                                        </tr>
                                    )
                                })
                                : "No Appointments Found!"}
                        </tbody>
                    </table>

                    { }
                </div>
            </section>
        </>
    );
};

export default Dashboard;