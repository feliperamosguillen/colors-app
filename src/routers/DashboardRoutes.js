import {Navbar} from '../components/ui/Navbar';
import {ColorScreen} from '../components/colors/ColorScreen';
import {ColorsScreen} from '../components/colors/ColorsScreen';
import {
	BrowserRouter as Router,
	Switch,
	Route,
    Redirect
} from "react-router-dom";

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div>
                <Switch>
                    <Route exact path="/colores" component={ColorsScreen}/>
                    <Route exact path="/color/:colorId" component={ColorScreen}/>

                    <Redirect to="/colores" />
                </Switch>
            </div>
        </>
    );
}