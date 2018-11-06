console.log('Starting notes.js');

var addNote = (title, body) => {
    console.log('adiing note ',title,body);
};

var getAll = () => {
    console.log('Getting all notes')
}
var getNote =( title) =>{
    console.log('reading note ',title);
}
var removeNote =( title) =>{
    console.log('remove note ',title);
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
}