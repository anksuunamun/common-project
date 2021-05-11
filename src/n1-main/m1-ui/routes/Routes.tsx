import React from "react";
import {Route, Switch} from "react-router-dom";
import Login from "../../../n2-features/f1-auth/a1-login/Login";
import Registration from "../../../n2-features/f1-auth/a2-registration/Registration";
import RecoveryPassword from "../../../n2-features/f1-auth/a3-recovery-password/RecoveryPassword";
import EnterNewPassword from "../../../n2-features/f1-auth/a4-enter-new-password/EnterNewPassword";
import Error from "../../../n3-utils/u1-error/Error";
import TestPage from "../test-page/Tests";
import Profile from "../profile/Profile";
import {Packs} from "../packs/Packs";

export const PATH = {
    PROFILE: "/profile",
    LOGIN: "/login",
    REGISTRATION: "/registration",
    RECOVERY_PASSWORD: "/recovery_password",
    ENTER_NEW_PASSWORD: "/enter_new_password",
    TEST_PAGE: "/test_page",
    PACKS: "/packs",
    CARDS: "/cards",
}

const Routes: React.FC = () => {
    return (
        <div>
            <Switch>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.RECOVERY_PASSWORD} render={() => <RecoveryPassword/>}/>
                <Route path={PATH.ENTER_NEW_PASSWORD} render={() => <EnterNewPassword/>}/>
                <Route path={PATH.PACKS} render={() => <Packs/>}/>
                <Route path={PATH.TEST_PAGE} render={() => <TestPage/>}/>
                <Route render={() => <Error/>}/>
            </Switch>
        </div>
    );
}

export default Routes;