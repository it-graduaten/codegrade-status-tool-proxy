import axios, { AxiosResponse, AxiosStatic } from 'axios';
require('dotenv').config()
const login = {
    username: process.env.CODEGRADE_USERNAME,
    password: process.env.CODEGRADE_PASSWORD,
    tenantId: process.env.CODEGRADE_TENANT_ID
}

const getLoggedInClient = async (client: AxiosStatic) => {
    let { data: { access_token } }: AxiosResponse = await axios.post(`${process.env.CODEGRADE_BASE_URL}/login`, login);
    client.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    return client;
}

const getUserIdFromStudentNumber = async (studentNumber: string, client: AxiosStatic) => {
    let userResult: AxiosResponse = await client.get(`${process.env.CODEGRADE_BASE_URL}/users?q=${studentNumber}`);
    return userResult.data[0].id;
}

const getLatestResultForAssignment = async (assignmentId: string, userId: string, client: AxiosStatic) => {
    let { data }: AxiosResponse = await client.get(`${process.env.CODEGRADE_BASE_URL}/assignments/${assignmentId}/users/${userId}/submissions/`);
    return data;
}

export { getLoggedInClient, getUserIdFromStudentNumber, getLatestResultForAssignment }