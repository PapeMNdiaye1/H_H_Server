const request = require('supertest');
const server = require('../server.js')

// #####################################################
it('Test for User signUp', (done) => {
    request(server)
        .post('/Posts')
        .send({
            postImage: "",
            postAuthorId: "",
            postAuthorPicture: "",
            postAuthorName: "",
            postTitle: "",
            postBody: "",
            postCategory: "",
            postDate: "",
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
            if (err) {
                console.log(err);
                return done(err)
            };
            done();
        });
});
// #####################################################
it('Test Post Creation', (done) => {
    request(server)
        .post('/Posts')
        .send({
            Name: "",
            Email: "",
            Password: ""
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
            if (err) {
                console.log(err);
                return done(err)
            };
            done();
        });
});
// #######################################################
it('Test for Getting all User', (done) => {
    request(server)
        .get('/Users')
        .expect(201)
        .end((err, res) => {
            if (err) {
                console.log(err);
                return done(err)
            };
            done();
        });
});
