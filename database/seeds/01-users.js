
exports.seed = function(knex) {
  return knex('users').insert([
    { username: 'karaReeve', password:'pass', firstName: 'Kara', lastName:'Reeve', email:'test@test.com', phoneNumber:'123-456-7890',  }, 
    { username: 'areebaChadwick', password:'pass', firstName: 'Areeba', lastName:'Chadwick', email:'test@test.com', phoneNumber:'123-456-7890',  }, 
    { username: 'kyronVelasquez', password:'pass', firstName: 'Kyron', lastName:'Velasquez', email:'test@test.com', phoneNumber:'123-456-7890',  }, 
    { username: 'liamHead', password: 'pass', firstName: 'Liam', lastName:'Head', email:'test@test.com', phoneNumber:'123-456-7890',  }, 
    { username: 'jayLord', password: 'pass', firstName: 'Jay', lastName:'Lord', email:'test@test.com', phoneNumber:'123-456-7890',  }, 
    { username: 'tasminHill', password: 'pass', firstName: 'Tasmin', lastName:'Hill', email:'test@test.com', phoneNumber:'123-456-7890',  },                                 
  ]);
};
