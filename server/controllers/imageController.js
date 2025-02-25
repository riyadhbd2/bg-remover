import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

import userModel from '../models/userModel.js';

// controller function to remove bg from image
const removeBgImage = async(req, res)=>{
    try {
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

export {removeBgImage};
