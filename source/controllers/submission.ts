import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Assignment } from '../types/assignment';
require('dotenv').config()
import { getLatestResultForAssignment, getLoggedInClient, getUserIdFromStudentNumber } from './helpers';

const getGradeForAssignment = async (req: Request, res: Response, next: NextFunction) => {
    const assignmentId: string = <string>req.params.assignmentId;
    let studentNumber: string = <string>req.query.studentNumber;

    const client = await getLoggedInClient(axios);
    const userId = await getUserIdFromStudentNumber(studentNumber, client);
    const latestResult = await getLatestResultForAssignment(assignmentId, userId, client);

    if (latestResult.length > 0) {
        return res.status(200).json({
            grade: latestResult[0].grade
        })
    }

    return res.status(200).json({
        grade: null
    })
}

export default { getGradeForAssignment };