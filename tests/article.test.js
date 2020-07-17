const expect = require('expect');
const request = require('supertest');
let app = require('../app');

describe('GET page/:pagenum', () => {
    it('get page number', (done) => {
        request(app)
        .get('/api/page/1')
        .expect(200)
        .expect((res) => {
            expect(res.body!=null).toBe(true);
            expect(res.body.length>=0).toBe(true);
        }).end(done);
    });
    it('not valid page number',(done)=> {
        request(app)
        .get('/api/page/gg1')
        .expect(500)
        .expect((res) => {
            expect(res.body.err!==undefined).toBe(true);
        }).end(done);
    });
});

