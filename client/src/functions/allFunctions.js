import { postDataAPI, getDataAPI, putDataAPI, deleteDataAPI } from "../utils/api";

// Patient
export const getAllPatients = async () => {
    try {
        const res = await getDataAPI('Patients');
        return res;
    } catch (error) {
        throw error;
    }
};

export const getPatientById = async (id) => {
    try {
        const res = await getDataAPI(`Patients/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const createPatient = async (data) => {
    try {
        const res = await postDataAPI('Patients', data);
        return res;
    } catch (error) {
        throw error;
    }
};

export const updatePatient = async (id, data) => {
    try {
        const res = await putDataAPI(`Patients/${id}`, data);
        return res;
    } catch (error) {
        throw error;
    }
};

export const deletePatient = async (id) => {
    try {
        const res = await deleteDataAPI(`Patients/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

// Doctor
export const getAllDoctors = async () => {
    try {
        const res = await getDataAPI('Doctors');
        return res;
    } catch (error) {
        throw error;
    }
};

export const getDoctorById = async (id) => {
    try {
        const res = await getDataAPI(`Doctors/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const getDoctorsBySpecialization = async (specialization) => {
    try {
        const res = await getDataAPI(`Doctors/spec/${specialization}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const createDoctor = async (data) => {
    try {
        const res = await postDataAPI('Doctors', data);
        return res;
    } catch (error) {
        throw error;
    }
};

export const updateDoctor = async (id, data) => {
    try {
        const res = await putDataAPI(`Doctors/${id}`, data);
        return res;
    } catch (error) {
        throw error;
    }
};

export const deleteDoctor = async (id) => {
    try {
        const res = await deleteDataAPI(`Doctors/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

// Appointment
export const getAllAppointments = async () => {
    try {
        const res = await getDataAPI('Appointments');
        return res;
    } catch (error) {
        throw error;
    }
};

export const getAppointmentById = async (id) => {
    try {
        const res = await getDataAPI(`Appointments/${id}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const createAppointment = async (data) => {
    try {
        const res = await postDataAPI('Appointments', data);
        return res;
    } catch (error) {
        throw error;
    }
};

export const cancelAppointment = async (id) => {
    try {
        const res = await putDataAPI(`Appointments/${id}/cancel`, {});
        return res;
    } catch (error) {
        throw error;
    }
};

export const getDoctorAppointments = async (doctorId) => {
    try {
        const res = await getDataAPI(`Appointments/doctor/${doctorId}`);
        return res;
    } catch (error) {
        throw error;
    }
};

export const getPatientAppointments = async (patientId) => {
    try {
        const res = await getDataAPI(`Appointments/patient/${patientId}`);
        return res;
    } catch (error) {
        throw error;
    }
};