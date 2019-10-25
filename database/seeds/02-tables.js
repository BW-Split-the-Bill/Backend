
exports.seed = function(knex) {
  return knex('tables').insert([
    { restaurant: 'Raymond of Australia', amountDue:'42.01', peopleCount: '3', createdBy:'areebaChadwick', }, 
    { restaurant: 'Lakeman Unlimited', amountDue:'74.59', peopleCount: '4', createdBy:'kyronVelasquez', }, 
    { restaurant: 'Giantbulb and Daughters', amountDue:'62.94', peopleCount: '2', createdBy:'liamHead', }, 
    { restaurant: 'Raymond and Sons', amountDue:'22.35', peopleCount: '3', createdBy:'jayLord', }, 
    { restaurant: 'Guildmasters of Worthington', amountDue:'144.49', peopleCount: '2', createdBy:'tasminHill', }, 
    { restaurant: 'Gordon Ramsay Private Table', amountDue:'142.50', peopleCount: '1', createdBy:'karaReeve', }, 
  ]);
};
