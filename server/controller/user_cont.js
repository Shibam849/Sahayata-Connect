const User = require("../db/userdb");
const Event = require("../db/eventdb");
const Registration = require("../db/registrationdb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// FIX: Use Env variable for secret, fallback to string for local dev
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

/* ================= EMAIL TRANSPORTER ================= */
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
/* ==================================================== */

module.exports = {

    async registerUser(req, res) {
        const { firstName, lastName, email, phone, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: "User already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user = new User({ firstName, lastName, email, phone, password: hashedPassword });
            await user.save();
            const payload = { user: { id: user.id } };
            jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: "Server error" });
        }
    },

    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials. Please check your email and password." });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials. Please check your email and password." });
            }
            const payload = { user: { id: user.id } };
            jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: { name: `${user.firstName} ${user.lastName}`, email: user.email }
                });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: "Server error" });
        }
    },

    async forgotPassword(req, res) {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.json({ msg: "If a user with that email exists, a reset link has been sent." });
            }

            const resetToken = crypto.randomBytes(20).toString("hex");
            user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
            user.resetPasswordExpires = Date.now() + 3600000;
            await user.save();

            const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

            await transporter.sendMail({
                to: user.email,
                subject: "Password Reset - Sahayata Connect",
                html: `
                    <p>You requested a password reset.</p>
                    <p>Click the link below to reset your password:</p>
                    <a href="${resetUrl}">${resetUrl}</a>
                    <p>This link will expire in 1 hour.</p>
                `
            });

            res.json({ msg: "Password reset link has been sent to your email." });

        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: "Server error" });
        }
    },

    async resetPassword(req, res) {
        try {
            const resetToken = req.params.token;
            const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
            const user = await User.findOne({
                resetPasswordToken: hashedToken,
                resetPasswordExpires: { $gt: Date.now() }
            });
            if (!user) {
                return res.status(400).json({ msg: "Password reset token is invalid or has expired." });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save();
            res.json({ msg: "Password has been updated." });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: "Server error" });
        }
    },

    async checkEventRegistration(req, res) {
        try {
            const token = req.header("x-auth-token");
            const decoded = jwt.verify(token, JWT_SECRET);
            const eventId = req.params.eventId;
            const userId = decoded.user.id;
            const registration = await Registration.findOne({ eventId, userId });
            return res.json({ isRegistered: !!registration });
        } catch (err) {
            return res.status(500).json({ isRegistered: false, msg: "Server Error" });
        }
    },

    async getMyRegisteredEvents(req, res) {
        try {
            const token = req.header("x-auth-token");
            if (!token) {
                return res.status(401).json({ msg: "No token, authorization denied" });
            }
            const decoded = jwt.verify(token, JWT_SECRET);
            const userId = decoded.user.id;
            const registrations = await Registration.find({ userId }).populate("eventId");
            const validRegistrations = registrations.filter(reg => reg.eventId !== null);
            res.json(validRegistrations);
        } catch (err) {
            console.error("Error fetching registered events:", err.message);
            res.status(500).json({ msg: "Server Error" });
        }
    },

    async registerForEvent(req, res) {
        try {
            const token = req.header("x-auth-token");
            if (!token) {
                return res.status(401).json({ msg: "Authorization denied. Please log in." });
            }
            const decoded = jwt.verify(token, JWT_SECRET);
            const userId = decoded.user.id;
            const { eventId } = req.body;

            const user = await User.findById(userId);
            const event = await Event.findById(eventId);
            if (!user || !event) {
                return res.status(404).json({ msg: "User or Event not found." });
            }

            const existingRegistration = await Registration.findOne({ eventId, userId });
            if (existingRegistration) {
                return res.status(400).json({ msg: "You are already registered for this event." });
            }

            const newRegistration = new Registration({
                eventId,
                userId,
                userName: `${user.firstName} ${user.lastName}`,
                eventName: event.eName
            });

            await newRegistration.save();
            res.status(201).json({ msg: "Registration successful!" });

        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({ msg: "You are already registered for this event." });
            }
            console.error("Event Registration Error:", err.message);
            res.status(500).json({ msg: "A server error occurred during registration." });
        }
    }
};