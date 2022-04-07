import React from 'react'
import AdminHeader from './../components/AdminHeader';

const AdminDashboard = () => {
  const session = JSON.parse(window.localStorage.getItem("user"));
  return (
      <>
      <AdminHeader />
      <section className="hero-section">
          <p>Welcome </p>
          <h1>Admin {session.licenseNo}</h1>
      </section>
      </>
  )
}
export default AdminDashboard;