import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest ,NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';



connect()

export async function POST (request: NextRequest){
    try {
        // parse the request body
        const requestBody = await request.json()
        const {username, email, password} =  requestBody
        console.log(requestBody);

        // check if user already exists
        const existingUser = await User.findOne({email})

        if (existingUser) {
            return NextResponse.json({error: 'User already exists'},
                {status: 400}
            )
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // save the user to the database
        const savedUser = await newUser.save()

        
        return NextResponse.json({message: 'User created successfully',success: true,  user: savedUser},
        )
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status: 500}
        )
    }
}