const {ObjectId} = require('mongoose').Types;
const {Student} = require('../../models');
const faker = require('faker/locale/en_IND');

const users = [];
const userNumber = 5;

for (var i=0 ; i<userNumber ; i++) {
    users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: faker.phone.phoneNumberFormat(1),
        email: faker.internet.email(),
        studentClass: 'BCA III',
        address: faker.address.secondaryAddress(),
        password: faker.internet.password(),
        _id: new ObjectId()
    });
}

const populateUsers = (done) => {
    Student.remove({}).then(() => {
        const userPromises = [];
        for (var i=0 ; i<userNumber ; i++) {
            userPromises.push(new Student(users[i]).save());
        }
        return Promise.all(userPromises);
    }).then(() => done());
};

module.exports = {users, populateUsers};
