import { Route, Switch } from 'react-router-dom';
import DefaultOptions from './login-workflow/DefaultOptions';
import Login from './login-workflow/Login';
import Registration from './login-workflow/Registration';

export default function WelcomeScreen() {

    return (
        <main className="welcome-screen">
            <section className="welcome-screen__user-onboarding">
                <Switch>
                    <Route path="/register" render={() => <Registration />} />
                    <Route path="/login" render={() => <Login />} />
                    <Route path="/" render={() => <DefaultOptions />} exact />
                </Switch>
            </section>
        </main>
    )
}