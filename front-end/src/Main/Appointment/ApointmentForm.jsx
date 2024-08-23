import React from 'react'

const ApointmentForm = () => {
  return (
<div class="container d-flex justify-content-center align-items-center vh-100">
        <form class="form-container border p-4 rounded shadow">
            <h2 class="text-center mb-4">Appointment Form</h2>
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="patientName" class="form-label">Patient Name</label>
                        <input type="text" class="form-control" id="patientName" placeholder="Enter patient name" required />
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="age" class="form-label">Age</label>
                        <input type="number" class="form-control" id="age" placeholder="Enter age" required />
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="mobileNumber" class="form-label">Mobile Number</label>
                        <input type="tel" class="form-control" id="mobileNumber" placeholder="Enter mobile number" required />
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="gender" class="form-label">Gender</label>
                        <select class="form-select" id="gender" required>
                            <option value="" disabled selected>Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="aadharNumber" class="form-label">Aadhar Number</label>
                        <input type="tel" class="form-control" id="aadharNumber" placeholder="Enter aadhar number" required />
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="appointmentDate" class="form-label">Appointment Date</label>
                        <input type="datetime-local" class="form-control" id="appointmentDate" name="appointmentDate" required />
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">Diagnostic Tests</label>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="test1" name="diagnosticTests" value="test1" />
                            <label class="form-check-label" for="test1">Test 1</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="test2" name="diagnosticTests" value="test2" />
                            <label class="form-check-label" for="test2">Test 2</label>
                        </div>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="mb-3">
                        <label for="diagnosticCenter" class="form-label">Diagnostic Center</label>
                        <select id="diagnosticCenter" name="diagnosticCenter" class="form-select" required>
                            <option value="" disabled selected>Select Diagnostic Center</option>
                            <option value="1">Center A</option>
                            <option value="2">Center B</option>
                        </select>
                    </div>
                </div>

                <div class="col-md-12">
                    <button type="submit" class="btn btn-primary w-100">Book Appointment</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default ApointmentForm
