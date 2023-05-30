import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/pages/Home';
import Header from './components/Header';
import { withPage } from './components/Page';


const route = (path: string, component: React.ReactNode) => (
    <Route path={ path } Component={ () => withPage(component) } />
);


const Router = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                { route('/', <Home /> ) }
            </Routes>
        </BrowserRouter>
    );
};

export default Router;