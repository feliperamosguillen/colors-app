import {Navbar} from '../components/ui/Navbar';
import {ColorScreen} from '../components/colors/ColorScreen';
import {ColorsScreen} from '../components/colors/ColorsScreen';
import {
	BrowserRouter as Router,
	Switch,
	Route,
    Redirect
} from "react-router-dom";
import { CreateColor } from '../components/crud-colors/CreateColor';
import { EditColor } from '../components/crud-colors/EditColor';

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

            <div>
                <Switch>
                    <Route exact path="/colores" component={ColorsScreen}/>
                    <Route exact path="/color/:colorId" component={ColorScreen}/>
                    
                    <Route exact path="/create-color" component={CreateColor}/>
                    <Route exact path="/edit-color/:colorId"
                            render={(props) => (
                                <EditColor colorId={props.match.params.colorId}/>
                            )} />

                    <Redirect to="/colores" />
                </Switch>
            </div>
        </>
    );
}
