const UNIQUE_RETRIES = 9999;
const ALPHABET = '23456789abdegjkmnpqrvwxyz';
const ID_LENGTH = 6;

const generate = () => {
  let result = '';
  for (let i = 0; i < ID_LENGTH; i++) {
    result += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return result;
};

export const generateUnique = (db) => {
  return db.ref('/games').once('value').then((snapshot) => {
    let id;
    let retries = 0;

    while(!id && retries < UNIQUE_RETRIES) {
      id = generate();
      if (snapshot.hasChild(id)) {
        id = null;
        retries += 1;
      }
    }

    return id;
  });
};
