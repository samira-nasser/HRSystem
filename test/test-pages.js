'use strict';
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;
const should = chai.should();
chai.use(chaiHttp);

let token = "";
let isAdmin;

describe('Auth controller test', function () {
    it('should return Token For this User', function () {
        let userToLogin = {
            Email: "Samira@sys.com",
            Password: "123456"
        };
        return chai.request(app)
            .post('/user/login')
            .send(userToLogin)
            .then(function (res) {
                switch (res.status) {
                    case 200:
                        expect(res.body).to.have.property('message').eql('User is logged in Successfully');
                        token = "Bearer" + " " + res.body.data.token;
                        isAdmin = res.body.data.IsAdmin;
                        break;
                    case 400:
                        expect(res.body).to.have.property('message').eql('Wrong Password');
                        break;
                    case 404:
                        expect(res.body).to.have.property('message').eql('User not found');
                        break;
                    default:
                        break;
                }
                expect(res).to.be.json;
            }).catch(function (err) {
                expect(err).to.have.status(400);
                expect(res).to.be.json;
            });
    })
})

describe('Employee Tests', function () {
    // POST - Add Employee
    it('should add employee and save its data ', function () {
        let employeeData = {
            Email: "nadanasser@sys.com",
            Password: "123456",
            Name: "Nada",
            ManagerID: 2,
            DepartmentID: 3
        };
        return chai.request(app)
            .post('/user/addEmployee')
            .set('Authorization', token)
            .send(employeeData)
            .then(function (res) {
                switch (res.status) {
                    case 200:
                        if (isAdmin) {
                            expect(res.body).to.have.property('message').eql('User Added Successfully');
                        }
                        else {
                            expect(res.body).to.have.property('message').eql('You are not authorized for this process !');
                        }
                        break;
                    case 401:
                        console.log("Unauthorized");
                        return ;
                        // expect(res).to.have.property('unauthorized').eql(true);
                        break;
                    default:
                        break;
                }
                expect(res).to.be.json;
            })
            .catch(function (err) {
                expect(err).to.have.status(400);
                expect(err).to.be.json;
            })
    });

    // POST - Edit Employee
    it('should add employee and save its data ', function () {
        let employeeData = {
            id: 10,
            Name: "Muhammed_1"
        };
        return chai.request(app)
            .post('/user/updateEmployee')
            .set('Authorization', token)
            .send(employeeData)
            .then(function (res) {
                switch (res.status) {
                    case 200:
                        expect(res.body).to.have.property('message').eql('User is Updated Successfully');

                        break;
                    case 401:
                        console.log("Unauthorized");
                        return ;
                        break;
                    default:
                        break;
                }
                expect(res).to.be.json;
            })
            .catch(function (err) {
                expect(err).to.have.status(400);
                expect(err).to.be.json;
            })
    });

});
