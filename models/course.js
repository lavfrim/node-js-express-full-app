const { v4: uuid } = require('uuid');
const fs = require('fs');
const path = require('path');

class Course {
    constructor(title, price, img) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = uuid();
    }

    createCourseObject() {
        return ({
            id: this.id,
            title: this.title,
            price: this.price,
            img: this.img,
        })
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this.createCourseObject());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    static async update(course) {
        const courses = await Course.getAll();

        const index = courses.findIndex(item => {
            return item.id === course.id
        });
        courses[index] = course;
        

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }

    static getAll() {
       return new Promise((resolve, reject) => {
        fs.readFile(
            path.join(__dirname, '..', 'data', 'courses.json'),
            'utf-8',
            (err, content) => {
                if (err) {
                    reject(err); 
                } else {
                    resolve(JSON.parse(content));
                }
            }
        );
       })
    }

    static async getCourseByID(id) {
        const courses = await Course.getAll();
        return courses.find(course => course.id === id);
    }
}

module.exports = Course;