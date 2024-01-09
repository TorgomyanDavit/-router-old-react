import * as React from 'react';
import * as moment from 'moment';
// @ts-ignore
import {createBrowserHistory} from 'history';
import {Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import RouteService from './platform/services/routes';
import './modules';


interface IState {
    confirmOpen: boolean;
    confirmProps: any;
    initialLoading: boolean;
    generalAPILoaded: boolean;
    successPayment: boolean;
    bannerModal:boolean;
    spinModal:boolean;
    showAppFooter:boolean;
};

class App extends React.Component<{}, IState> {
    public state: IState = {
        generalAPILoaded: false,
        initialLoading: false,
        confirmOpen: false,
        successPayment: false,
        bannerModal:false,
        spinModal: false,
        showAppFooter:false,
        // bannerModal:false,
        confirmProps: {}
    };
    public async componentDidMount() {
        window.abortableRequests = [];
        window.routerHistory = createBrowserHistory();
        this.setState({generalAPILoaded: true});
    }

    public render() {
        const {generalAPILoaded, initialLoading, confirmOpen, confirmProps,showAppFooter} = this.state;

        return generalAPILoaded ? ( 
            <Router history={window?.routerHistory}>
                <section className="G-page-content">
                    <Switch>
                        {RouteService.subscribeUnauthorized(routes => routes.map(item => <Route
                            exact={true}
                            key={item.path}
                            path={item.path}
                            render={(props) => (
                                <item.component initialLoading={initialLoading} {...props} />
                            )}
                        />))}

                        {true && true && RouteService.subscribeAuthorized(routes => routes.map(item => <Route
                            exact={true}
                            key={item.path}
                            path={item.path}
                            component={item.component}
                        />))}
                    </Switch>
                </section>
            </Router>
        ) : null;
    }
}
export default App;




