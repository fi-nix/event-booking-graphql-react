/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const transformEvent = event => ({
  ...event._doc,
  _id: event.id,
  date: dateToString(event._doc.date),
  creator: user.bind(this, event.creator),
});

const transformBooking = booking => ({
  ...booking._doc,
  _id: booking.id,
  user: user.bind(this, booking._doc.user),
  event: singleEvent.bind(this, booking._doc.event),
  createdAt: dateToString(booking._doc.createdAt),
  updatedAt: dateToString(booking._doc.updatedAt),

});


const events = async (eventIds) => {
  try {
    const filteredEvents = await Event.find({ _id: { $in: eventIds } });
    return filteredEvents.map(event => transformEvent(event));
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const foundUser = await User.findById(userId);
    return {
      ...foundUser._doc,
      _id: foundUser.id,
      createdEvents: events.bind(this, foundUser._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
