// const Note = require('../models/note')

// const initialNotes = [
//   {
//     content: 'HTML on helppoa',
//     important: false
//   },
//   {
//     content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
//     important: true
//   }
// ]

// const format = (user) => {
//   return {
//     content: note.content,
//     important: note.important,
//     id: note._id
//   }
// }

// const nonExistingId = async () => {
//   const user = new User()
//   await user.save()
//   await user.remove()

//   return note._id.toString()
// }

// const usersInDb = async () => {
//   const users = await User.find({})
//   return users.map(format)
// }

// module.exports = {
//   initialNotes, format, nonExistingId, notesInDb
// }