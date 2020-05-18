const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
    const courses = await Course.getAll();

    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses: courses,
    });
});

router.get('/:id', async (req, res) => {
    const course = await Course.getCourseByID(req.params.id);
    res.render('course', {
        layout: 'course',
        title: `Course ${course.title}`,
        course,
    });
});

module.exports = router;
