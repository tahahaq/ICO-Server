var exports = module.exports = {},
    utilsFunctions = require('../utils/functions'),
    constants = require('../utils/constant');

//
// exports.getEventById = async (eventId) => {
//     try {
//         let event = await eventModel.findById(eventId);
//         if (!event) {
//             throw new Error("No event found with given Id")
//         }
//         let eventObject = event.toObject();
//         delete eventObject.user.id;
//
//         return eventObject;
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
// exports.getInvitations = async (userId) => {
//     try {
//         let user = await userModel.findById(userId)
//             .populate({
//                 path: 'invitations.sender',
//                 model: 'User'
//             }).populate({
//                 path: 'invitations.event',
//                 model: 'Event'
//             });
//         let invitations = [];
//         for (let i = 0; i < user.invitations.event.length; i++) {
//             invitations.push(user.invitations.event[i].toObject());
//             invitations[i].invitor_name = user.invitations.sender[i].name;
//             invitations[i].invitor_email = user.invitations.sender[i].email;
//         }
//         if (!user) {
//             throw new Error("No user found with given Id")
//         }
//         return invitations;
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
//
// exports.getUserInterestedEvents = async (userId) => {
//     try {
//         let user = await userModel.findById(userId)
//             .populate('interested_events');
//         if (!user) {
//             throw new Error("No user found with given Id")
//         }
//         return user.interested_events;
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
// exports.getEventByUserId = async (userId) => {
//     try {
//         const events = await eventModel.find({"user.id": userId});
//         if (utilsFunctions.isEmpty(events)) {
//             throw new Error("No event found with given Id")
//         }
//         for (let i = 0; i < events.length; i++) {
//             delete events[0].user.id
//         }
//         return events;
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
//
// exports.getAllUsers = async () => {
//     try {
//         return await userModel.find({});
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
//
// exports.getAllEvents = async () => {
//     try {
//         return await eventModel.find({});
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
//
// exports.getUserById = async (userId) => {
//     try {
//         return await userModel.findById(userId);
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//
// exports.getEventById = async (eventId) => {
//     try {
//         let event = await eventModel.findById(eventId);
//         if (!event) {
//             throw new Error("No event found with given Id")
//         }
//         let eventObject = event.toObject();
//         delete eventObject.user.id;
//
//         return eventObject;
//     } catch (e) {
//         console.log(e);
//         throw new Error(e);
//     }
// };
//

