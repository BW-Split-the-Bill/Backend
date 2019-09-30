
exports.seed = function(knex) {
  return knex('tableUsernamePaid').insert([
    { tableId: '1', username:'kyronVelasquez', }, 
    { tableId: '2', username:'areebaChadwick', }, 
    { tableId: '3', username:'jayLord', }, 
    { tableId: '4', username:'liamHead', }, 
    { tableId: '5', username:'karaReeve', }, 
    { tableId: '6', username:'tasminHill', }, 
  ]);
};
