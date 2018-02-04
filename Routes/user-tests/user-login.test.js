const request = require('supertest');
const expect = require('expect');

const app = require('../../index');
const {users, populateUsers} = require('./user-test.seed');

beforeEach(populateUsers);

describe('user login', () => {
    // it('should login a user', (done) => {
    //     request(app)
    //         .post('/user/login')
    //         .send({
    //             email: users[0].email,
    //             password: users[0].password
    //         })
    //         .expect(200)
    //         .expect((response) => {
    //             expect(response.body.firstName).toBe(users[0].firstName);
    //             expect(response.body.lastName).toBe(users[0].lastName);
    //             expect(response.body.phoneNumber).toBe(users[0].phoneNumber);
    //             expect(response.body.email).toBe(users[0].email);
    //             expect(response.body.studentClass).toBe(users[0].studentClass);
    //             expect(response.body.address).toBe(users[0].address);
    //             expect(response.body._id).toBe(users[0]._id);
    //         })
    //         .end(done);
    // });
    // it('should not login a user for wrong username or password', () => {

    // });
});
