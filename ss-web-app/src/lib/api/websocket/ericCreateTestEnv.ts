/* eslint-disable no-console */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { act } from '@testing-library/react-native';

import {
  createEnvironment,
  DependenciesProvider,
  Environment,
} from 'dependencies';
import { RootStoreModel, RootStoreProvider, RootStore } from 'models';
import { createMockApi } from 'services/ApiService/test/createMockApi';
import { clear } from 'utils/storage';
import type { ContactBookStore as ContactBookStoreType } from 'models';
import { RootNavigator, onNavigationReady } from 'navigators';

const createTestEnv = async ({
  rootStoreState = {},
  clearAsyncStorage = true,
  skipSetup = false,
} = {}) => {
  if (clearAsyncStorage) clear(); // Otherwise rootStore gets persisted

  const env = await createEnvironment();
  if (!skipSetup) await env.setup(); // Matches new init in app.tsx
  const rootStore = RootStoreModel.create(rootStoreState, env);
  const mockApi = createMockApi(env.services.apiService.axiosAdaptor);

  return { mockApi, rootStore, env };
};

const disableConsoleErrorForCall = (fn: Function) => {
  const errorObject = console.error;
  console.error = jest.fn();
  fn();
  console.error = errorObject;
};

interface Props {
  children: React.ReactNode;
  dependencies: Environment;
  rootStore: RootStore;
}

const TestEnvProvider = ({ children, dependencies, rootStore }: Props) => (
  <DependenciesProvider value={dependencies}>
    <RootStoreProvider value={rootStore}>{children}</RootStoreProvider>
  </DependenciesProvider>
);

// https://react-hooks-testing-library.com/usage/advanced-hooks#context
const getWrapper =
  (dependencies: Environment, rootStore: RootStore) =>
  ({ children }: { children: React.ReactNode }) =>
    (
      <TestEnvProvider dependencies={dependencies} rootStore={rootStore}>
        {children}
      </TestEnvProvider>
    );

const WrapWithBasicNavAndEnv = ({
  children,
  dependencies,
  rootStore,
}: Props) => {
  const Stack = createStackNavigator();

  return (
    <TestEnvProvider dependencies={dependencies} rootStore={rootStore}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='test'>{() => children}</Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </TestEnvProvider>
  );
};

const WrapWithTabNavAndEnv = ({ children, dependencies, rootStore }: Props) => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  return (
    <TestEnvProvider dependencies={dependencies} rootStore={rootStore}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='test-tab'>
            {() => (
              <Stack.Navigator>
                <Stack.Screen name='test'>{() => children}</Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </TestEnvProvider>
  );
};

const FullAppNavStack = ({
  dependencies,
  rootStore,
}: Omit<Props, 'children'>) => {
  const navigationRef = React.useRef<any>() as any;

  const {
    services: { navigationService, trackingService },
    uiStores: { ToolTipStore },
  } = dependencies;

  const handleStateChange = (state: any) => {
    navigationService.onNavigationStateChange(state, trackingService.trackNav);
  };

  const {
    uiStores: { FeatureTourStore, ContactBookStore },
  } = dependencies;

  FeatureTourStore.setfeatureTourStatus('viewed');
  setContactBookStoreLoaded(ContactBookStore);

  // Prevents a bunch of console spam d/t timeout implementation on useEffect inside CreateRealModalScreen
  ToolTipStore.markToolTipViewed(ToolTipStore.getToolTipsTypes().SendCheckIn);

  React.useEffect(() => {
    if (dependencies) {
      act(() => {
        dependencies.services.navigationService.setRootNavigation(
          navigationRef
        );
      });
    }
  }, [dependencies]);

  return (
    <TestEnvProvider dependencies={dependencies} rootStore={rootStore}>
      <RootNavigator
        ref={navigationRef}
        onStateChange={handleStateChange}
        onReady={onNavigationReady}
        linking={null as any}
      />
    </TestEnvProvider>
  );
};

const setContactBookStoreLoaded = (contactBookStore: ContactBookStoreType) => {
  contactBookStore.setIsInitialLoadComplete(true);
  // @ts-expect-error Mocks cause the date to fail
  contactBookStore.setLastLoadedContactsAt(true);
};

const getModalfyProps = (): any => ({
  closeModal: jest.fn(),
  getParam: jest.fn(),
});

export {
  createTestEnv,
  TestEnvProvider,
  getWrapper,
  WrapWithBasicNavAndEnv,
  WrapWithTabNavAndEnv,
  setContactBookStoreLoaded,
  getModalfyProps,
  FullAppNavStack,
  disableConsoleErrorForCall,
};
