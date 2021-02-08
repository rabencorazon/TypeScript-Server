import 'dotenv/config';

import App from './app';
import user from './routes/user';

const app = new App({
    routes: [
        { path: "/user", router: user }
    ]
});

app.listen();