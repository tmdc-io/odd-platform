import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { DataEntityTypeDictionary } from 'generated-sources';
import { toolbarHeight } from 'lib/constants';
import AppLoadingPage from 'components/shared/AppLoadingPage/AppLoadingPage';
import AppToolbarContainer from './shared/AppToolbar/AppToolbarContainer';

// lazy components
const ManagementContainer = React.lazy(
  () => import('./Management/ManagementContainer')
);
const DataEntityDetailsContainer = React.lazy(
  () => import('./DataEntityDetails/DataEntityDetailsContainer')
);
const OverviewContainer = React.lazy(
  () => import('./Overview/OverviewContainer')
);
const SearchContainer = React.lazy(
  () => import('./Search/SearchContainer')
);
const AlertsContainer = React.lazy(
  () => import('./Alerts/AlertsContainer')
);

interface AppProps {
  fetchDataEntitiesTypes: () => Promise<DataEntityTypeDictionary>;
}

const App: React.FC<AppProps> = ({ fetchDataEntitiesTypes }) => {
  useEffect(() => {
    fetchDataEntitiesTypes();
  }, []);
  const location = useLocation();

  return (
    <div className="App">
      {!location.pathname.includes('embedded') && <AppToolbarContainer />}
      <div style={{ paddingTop: `${toolbarHeight}px` }}>
        <React.Suspense fallback={<AppLoadingPage />}>
          <Switch>
            <Route exact path="/" component={OverviewContainer} />
            <Route path="/alerts/:viewType?" component={AlertsContainer} />
            <Route
              path="/management/:viewType?"
              component={ManagementContainer}
            />
            <Route
              exact
              path="/search/:searchId?"
              component={SearchContainer}
            />
            <Route
              path="/dataentities/:dataEntityId/:viewType?"
              component={DataEntityDetailsContainer}
            />
            <Route
              path="/embedded/dataentities/:dataEntityId/:viewType?"
              component={DataEntityDetailsContainer}
            />
            <Route
              exact
              path="/embedded/search/:searchId?"
              component={SearchContainer}
            />
          </Switch>
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;
