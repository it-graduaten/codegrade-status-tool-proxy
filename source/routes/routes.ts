import express from 'express';
import submissionController from '../controllers/submission';
import courseController from '../controllers/course';
const router = express.Router();


router.get("/course/:courseId", courseController.getCourseWithAssignmentsAndGrade)
router.get("/course", courseController.getCourses)

router.get("/offline/course/:courseId", courseController.getCourseWithAssignmentsAndGradeOffline)
router.get("offline/course", courseController.getCourses)

// router.get("/submission/:assignmentId", submissionController.getGradeForAssignment)

export = router;