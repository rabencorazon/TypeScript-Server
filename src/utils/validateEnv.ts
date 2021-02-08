import {
    cleanEnv, str, port, num
} from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        dbhost: str(),
        dbport: str(),
        dbuser: str(),
        dbpswd: str(),
        dbname: str(),

        port: port()
    });
}