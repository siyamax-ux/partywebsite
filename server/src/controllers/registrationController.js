const Registration = require('../models/Registration');

const registerUser = async (req, res) => {
  try {
    const { name, address, email, mobile, age, gender, date, venue, totalMembers } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const registrationId = 'REG' + Math.floor(100000 + Math.random() * 900000);

    const registration = new Registration({
      name,
      address,
      email,
      mobile,
      age,
      gender,
      date,
      venue,
      totalMembers: totalMembers || 1,
      image: req.file.filename,
      registrationId
    });

    await registration.save();
    res.status(201).json({ message: 'Booking Confirmed 🎉', registration });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }
    await Registration.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, getAllRegistrations, deleteRegistration };
