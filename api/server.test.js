const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('./server.js');


describe('the server with seeds', () => {
    const credentials = {
        "username":"cale2", 
        "password":"pass",
        "firstName":"Cale",
        "lastName":"Test",
        "phoneNumber":"480-555-1234",
        "email":"test@test.test"	
    };
     
    describe('the get username choices function', () => {
        it('should return status 200', async () => {
            //test setup
            return request(server)
            .get('/users/choices')
            .then(res => {
                expect(res.status).toBe(200)
            })
        });

        // this test should fail if seeds were not just run immediately prior, due to .unique sqlite constraint
        // knex seed:run  --env=testing
        it('should return a list of the usernames (this test will fail if seeds were not run immediately prior)', async () => {
          //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                return request(server)
                .get('/users/choices')
                .then(res => {
                    expect(res.body.length).toBe(7)
                })
            })
        });
    });
})

describe('The server', () => {
    const credentials = {
        "username":"cale2", 
        "password":"pass",
        "firstName":"Cale",
        "lastName":"Test",
        "phoneNumber":"480-555-1234",
        "email":"test@test.test"	
    };
    const loginCredentials = {
        "username":"cale2",
        "password":"pass"
    };

    describe('the server is runnning', () => {
        it('should return a status 200', async () => {
            return request(server)
            .get('/')
            .then((response) => {
                expect(response.status).toBe(200);
            })
        })
        it('should return the correct message', () => {
            return request(server)
            .get('/')
            .then((response) => {
                expect(response.body.message).toBe('OK running')
            })
        })
    })

});

describe('The auth router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    const credentials = {
        "username":"cale2", 
        "password":"pass",
        "firstName":"Cale",
        "lastName":"Test",
        "phoneNumber":"480-555-1234",
        "email":"test@test.test"	
    };

    const loginCredentials = {
        "username":"cale2",
        "password":"pass"
    };

    describe('the register user function', () => {
        it('should return status 201', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                //assertion
                expect(res.status).toBe(201)
            })
        });

        it('should return the userid', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                //assertion
                // console.log('res.body',res.body)
                expect(res.body.user).toEqual([1])
            })
        });

    });

    describe('the login user function', () => {
        it('should return a welcome message', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                return request(server)
                .post('/auth/login')
                .send(loginCredentials)
                .then(res => {
                    expect(res.body.message).toBe('Welcome cale2!')
                })
            })
        });

        it('should return status 200', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                return request(server)
                .post('/auth/login')
                .send(loginCredentials)
                .then(res => {
                    expect(res.status).toBe(200)
                })
            })
        });
    });
});

describe('The users router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    const credentials = {
        "username":"cale2", 
        "password":"pass",
        "firstName":"Cale",
        "lastName":"Test",
        "phoneNumber":"480-555-1234",
        "email":"test@test.test"	
    };

    const loginCredentials = {
        "username":"cale2",
        "password":"pass"
    };

    describe('get /users/all', () => {
        it('should return status 200', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .get('/users/all')
                .set({'authorization':`${token}`, 'privilege':'admin'})
                .then(res => {
                    expect(res.status).toBe(200)
                })
            })
        });

        it('should return an array with one user', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .get('/users/all')
                .set({'authorization':`${token}`, 'privilege':'admin'})
                .then(res => {
                    expect(res.body.length).toBe(1)
                })
            })
        });

    });

    describe('the get username choices function', () => {
        it('should return status 200', async () => {
            //test setup
            return request(server)
            .get('/users/choices')
            .then(res => {
                expect(res.status).toBe(200)
            })
        });

        it('should return a list of the usernames', async () => {
          //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                return request(server)
                .get('/users/choices')
                .then(res => {
                    expect(res.body.length).toBe(1)
                })
            })
        });
    });
});

describe('The tables router', () => {
    beforeEach(async () => {
        await db('users').truncate();
        await db('tables').truncate();
    });

    const credentials = {
        "username":"cale2", 
        "password":"pass",
        "firstName":"Cale",
        "lastName":"Test",
        "phoneNumber":"480-555-1234",
        "email":"test@test.test"	
    };

    const loginCredentials = {
        "username":"cale2",
        "password":"pass"
    };

    const tableInfo = {
        "restaurant":"TacoBell",
        "amountDue":"80.00",
        "peopleCount":"2",
        "createdBy":"cale2"
    }

    describe('create new table', () => {
        it('should return status 201', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    expect(res.status).toBe(201)
                })
            })
        });

        it('should return an array with the newly created table', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    expect(res.body.length).toBe(1)
                })
            })
        });

    });

    describe('the get all tables function', () => {
        it('should return an array with one table', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .get('/tables/')
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        expect(res.body.length).toBe(1)
                    })
                })
            })
        });

        it('returned table has payor information attached', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .get('/tables/')
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        expect(res.body[0].createdBy).toBe('cale2')
                    })
                })
            })
        });
    });

    describe('the get table by id function', () => {
        it('should return an array with one table', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .get('/tables/1')
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        expect(res.body.length).toBe(1)
                    })
                })
            })
        });

        it('returned table has payor information attached', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .get('/tables/1')
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        expect(res.body[0].createdBy).toBe('cale2')
                    })
                })
            })
        });
    });
});





describe('The usernamePaid router', () => {
    beforeEach(async () => {
        await db('users').truncate();
        await db('tables').truncate();
        await db('tableUsernamePaid').truncate();
    });

    const credentials = {
        "username":"cale2", 
        "password":"pass",
        "firstName":"Cale",
        "lastName":"Test",
        "phoneNumber":"480-555-1234",
        "email":"test@test.test"	
    };

    const loginCredentials = {
        "username":"cale2",
        "password":"pass"
    };

    const tableInfo = {
        "restaurant":"TacoBell",
        "amountDue":"80.00",
        "peopleCount":"2",
        "createdBy":"cale2"
    };

    const uprInfo = { 
        "tableId": "1",
        "username":"cale1", 
    };

    const markAsPaid = { 
        "paid":"1" 
    };

    const usernameForSearch1 = {
        "username":"cale1"
    }

    const usernameForSearch2 = {
        "username":"cale2"
    }

    describe('create new ledger', () => {
        it('should return status 201', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .post('/upr/')
                    .send(uprInfo)
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        expect(res.status).toBe(201)
                    })
                })
            })
        });

        it('should show the ledger as unpaid', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .post('/upr/')
                    .send(uprInfo)
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        expect(res.body[0].paid).toBe(0)
                    })
                })
            })
        });


    });

    describe('the get ledger by id function', () => {
        it('should show return a ledger', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .post('/upr/')
                    .send(uprInfo)
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        return request(server)
                        .get('/upr/ledgers/1')
                        .set({'authorization':`${token}`})
                        .then(res => {
                            expect(res.body.length).toBe(1)
                        })
                    })
                })
            })
        });

        it('should return an unpaid ledger', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .post('/upr/')
                    .send(uprInfo)
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        return request(server)
                        .get('/upr/ledgers/1')
                        .set({'authorization':`${token}`})
                        .then(res => {
                            expect(res.body[0].paid).toBe(0)
                        })
                    })
                })
            })
        });
    });


    describe('the pay a ledger function', () => {
        it('should return an paid ledger', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .post('/upr/')
                    .send(uprInfo)
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        return request(server)
                        .put('/upr/ledgers/1/pay')
                        .send(markAsPaid)
                        .set({'authorization':`${token}`})
                        .then(res => {
                            expect(res.body[0].paid).toBe(1)
                        })
                    })
                })
            })
        });

        it('should return an status 201', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .post('/upr/')
                    .send(uprInfo)
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        return request(server)
                        .put('/upr/ledgers/1/pay')
                        .send(markAsPaid)
                        .set({'authorization':`${token}`})
                        .then(res => {
                            expect(res.status).toBe(201)
                        })
                    })
                })
            })
        });
    });

    describe('the get all ledgers by username function', () => {
        it('should return all ledgers with the username of the ower', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .post('/upr/')
                    .send(uprInfo)
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        return request(server)
                        .post('/upr/ledgers/')
                        .send(usernameForSearch1)
                        .set({'authorization':`${token}`})
                        .then(res => {
                            expect(res.body[0].username).toBe('cale1')
                        })
                    })
                })
            })
        });

        it('should return a message if no ledgers are found for the user', async () => {
            //test setup
            return request(server)
            .post('/auth/register')
            .send(credentials)
            .then(res => {
                const token = res.body.token
                return request(server)
                .post('/tables/new')
                .send(tableInfo)
                .set({'authorization':`${token}`})
                .then(res => {
                    return request(server)
                    .post('/upr/')
                    .send(uprInfo)
                    .set({'authorization':`${token}`})
                    .then(res =>{
                        return request(server)
                        .post('/upr/ledgers/')
                        .send(usernameForSearch2)
                        .set({'authorization':`${token}`})
                        .then(res => {
                            expect(res.body.message).toBe('This user is not on any tabs')
                        })
                    })
                })
            })
        });
    });
});