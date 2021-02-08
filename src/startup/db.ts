import mongoose from 'mongoose';

export default async function () {
    const {
        dbuser,
        dbpswd,
        dbhost,
        dbport,
        dbname
    } = process.env;

    let connection_url = `mongodb://${dbuser}:${dbpswd}@${dbhost}:${dbport}/${dbname}`;

    let conn = await mongoose.connect(connection_url, { useUnifiedTopology: true, useNewUrlParser: true });

    console.log("The connection state of mongoose : connected");
}