import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { DataEntityTypeDictionary } from 'generated-sources';
import { toolbarHeight } from 'lib/constants';
import AppLoadingSpinnerContainer from './shared/AppLoadingSpinner/AppLoadingSpinnerContainer';
import AppToolbarContainer from './shared/AppToolbar/AppToolbarContainer';

// Lazy loading components
const DataEntityDetailsContainer = React.lazy(
  () => import('./DataEntityDetails/DataEntityDetailsContainer')
);
const ManagementContainer = React.lazy(
  () => import('./Management/ManagementContainer')
);
const SearchContainer = React.lazy(
  () => import('./Search/SearchContainer')
);
const OverviewContainer = React.lazy(
  () => import('./Overview/OverviewContainer')
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
  return (
    <div className="App">
      <AppLoadingSpinnerContainer />
      <AppToolbarContainer />
      <div style={{ paddingTop: `${toolbarHeight}px` }}>
        <React.Suspense fallback={<span>loading..</span>}>
          {' '}
          {/* TODO: replace with proper content placeholder */}
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
          </Switch>
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;
