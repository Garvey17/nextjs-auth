import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";  
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";
import { get } from "http";

connect();

export async function GET(request: NextRequest) {
    try {
       const userID = await getDataFromToken(request);
       const user = await User.findOne({_id: userID}).select('-password ')
       return NextResponse.json({
        message: "User has been found",
        data: user
       });
    } catch (error:any) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 400 });
        
    }
}