

import 'dotenv/config';
import bcrypt from 'bcryptjs';

import nodemailer from "nodemailer";
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure:true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD

    }
});



//teating success
transporter.verify((error, success) => {
    if (error) {
        console.error("Error connecting to the email service:", error); // Improved logging
    } else {
        ("Ready for message:", success);
    }
});


export const sendMassage = async (req, res) => {
    const { userEmail,  deliverypersonemail, pin,boxId } = req.body; 

    try {
        // Email options
        const mailOptions = {
            from: userEmail,  
            to: deliverypersonemail, 
            subject: `Delivery Confirmation for  ${userEmail}`, 
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #2C3E50;">PIN for Box Opening</h2>
                    <p style="font-size: 1.2em; color: #555;">Dear Delivery Person,</p>
                    <p style="font-size: 1.2em; color: #555;">
                        Permission has been granted by the customer for the delivery. A one-time PIN has been generated for box ID: <b>${boxId.slice(-6)}</b>.
                    </p>

                    <p style="font-size: 1.2em; color: #555;">Please enter the following PIN to open the box:</p>
                    <h3 style="color: #2C3E50; font-size: 1.5em; font-weight: bold;">${pin}</h3>
                    <p style="font-size: 1.2em; color: #555;">This PIN is for one-time use only, so please be careful and do not share it.</p>
                    <p style="font-size: 1.1em; color: #555;">If you did not request this PIN, please ignore this message.</p>
                    <p style="color: #888; font-size: 0.9em;">Thank you,</p>
                    <p style="color: #888; font-size: 0.9em;">The DoorDrop Team</p>
                    <br>
                    <p style="color: #999; font-size: 0.8em;">Note: This email was sent automatically by the DoorDrop system to assist you with the delivery process.</p>
                </div>
            `,
        };
        

        await transporter.sendMail(mailOptions);

        // Respond back to the client with success message
        return res.status(200).json({
            success: true,
            message: "Verification PIN email sent successfully",
            data: { userEmail, deliverypersonemail, boxId },
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};