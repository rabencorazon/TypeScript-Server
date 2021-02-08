import * as express from 'express';
import { hash, compare } from 'bcrypt';

import HelperUtils from '../utils/helper';
import User from './users.interface'
import userModel from './users.model';

class UsersController {
    public path = '/users';

    private user = userModel;

    getAllUsers = (request: express.Request, response: express.Response) => {
        this.user.find()
            .then(users => {
                return response.status(200).json(HelperUtils.successObj({ message: "List of users!", result: users }));
            })
            .catch(error => {
                return response.status(500).json(HelperUtils.errorObj({ message: "Internal Error!", error }));
            });
    }

    getAUser = (request: express.Request, response: express.Response) => {
        let { userId } = request.params;

        this.user.findById(userId)
            .then(user => {
                if (!user) return response.status(200).json(HelperUtils.successObj({ message: "No user found!" }));

                return response.status(200).json(HelperUtils.successObj({ message: "Details of user!", result: user }));
            })
            .catch(error => {
                return response.status(500).json(HelperUtils.errorObj({ message: "Internal Error!", error }));
            });
    }

    register = async (request: express.Request, response: express.Response) => {
        let user: User = request.body;

        let hashedPassword = await hash(user.password, 10);

        user.password = hashedPassword;

        new this.user(user).save()
            .then(createdUser => {
                createdUser.password = undefined;
                return response.status(200).json(HelperUtils.successObj({ message: "User created!", result: createdUser }));
            })
            .catch(error => {
                return response.status(500).json(HelperUtils.errorObj({ message: "Internal Error!", error }));
            });
    }

    updateAUser = (request: express.Request, response: express.Response) => {
        let { userId } = request.params, user: User = request.body;

        this.user.findByIdAndUpdate(userId, user)
            .then(updatedUser => {
                if (!updatedUser) return response.status(200).json(HelperUtils.successObj({ message: "No user found!" }));

                return response.status(200).json(HelperUtils.successObj({ message: "User updated!", result: updatedUser }));
            })
            .catch(error => {
                return response.status(500).json(HelperUtils.errorObj({ message: "Internal Error!", error }));
            });
    }

    login = (request: express.Request, response: express.Response) => {
        let { email, password } = request.body;

        this.user.findOne({ email })
            .then(async user => {
                if (!user) return response.status(200).json(HelperUtils.successObj({ message: "User not found!" }));

                let isValid = await compare(password, user.password);

                if (!isValid) return response.status(200).json(HelperUtils.successObj({ message: "Invalid Password!" }));

                let token = user.generateSessionToken();

                let result = {
                    email: user.email,
                    name: user.name,
                    authToken: token
                }

                return response.status(200).json(HelperUtils.successObj({ message: "Login successful!", result }));
            })
            .catch(error => {
                console.log(error);
                return response.status(500).json(HelperUtils.errorObj({ message: "Internal Error!", error }));
            });
    }
}

export default UsersController;