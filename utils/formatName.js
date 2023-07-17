const formatName = (obj) => {
  let { firstName: name, surname } = obj;
  let str = `${name} ${surname}`;
  return str.normalize("NFD").replace(/[\u0300-\u036f]/gi, "");
};

const capitalizeName = (obj) => {
  let { firstName, surname } = obj;
  firstName = `${firstName}`.toLowerCase().split(" ");
  surname = `${surname}`.toLowerCase().split(" ");

  for (let i = 0; i < firstName.length; i++) {
    firstName[i] = firstName[i][0].toUpperCase() + firstName[i].slice(1);
  }
  firstName = firstName.join(" ");
  for (let i = 0; i < surname.length; i++) {
    surname[i] = surname[i][0].toUpperCase() + surname[i].slice(1);
  }
  surname = surname.join(" ");

  return { firstName, surname };
};

module.exports = { formatName, capitalizeName };
