import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect("mongodb+srv://adebola:adebola123@cluster0.2chaqqy.mongodb.net/")
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('mongodb connected successfully');
            
        })
    } catch (error) {
        console.log('something went wrong while connecting to the database');
        console.error(error);
        
    }
}