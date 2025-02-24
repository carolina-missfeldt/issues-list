import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Repositories from './pages/Repos';

export const RouterApp = () => {    
    return (
        <Router>
            <Switch>
                <Route path="/" component={Home} exact></Route>
                <Route path="/repositorio/:repo" component={Repositories} exact>
                </Route>
                 <Route path="*" component={Home}></Route>
            </Switch>
        </Router>
    );
}