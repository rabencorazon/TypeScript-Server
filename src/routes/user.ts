import { Router, Request, Response } from 'express';

import UsersController from '../users/users.controller';

const user = new UsersController();

export default Router()
    /**
    * @typedef User
    * @property {string} email - email of user 
    * @property {string} name - name of user
    * @property {string} password - password of user
    */

    /**
     * User Registration
     * @route POST /user/register
     * @param {User.model} data.body.required - user object here
     * @group User - User operation
     * @returns {Success} 200 -
     *      Returns added user object
     *
     * @returns {Error}  Error - Unexpected error
     */
    .post('/register', (request: Request, response: Response) => user.register(request, response))

    /**
        * @typedef UserLogin
        * @property {string} email - email of user 
        * @property {string} password - password of user
        */

    /**
     * User Login
     * @route POST /user/login
     * @param {UserLogin.model} data.body.required - login object here
     * @group User - User operation
     * @returns {Success} 200 -
     *      Returns added user object
     *
     * @returns {Error}  Error - Unexpected error
     */
    .post('/login', (request: Request, response: Response) => user.login(request, response))