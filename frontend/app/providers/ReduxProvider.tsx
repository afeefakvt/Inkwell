"use client";

import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode } from "react";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  // Only show PersistGate if persistor exists (i.e., client-side)
  return (
    <Provider store={store}>
      {typeof window !== "undefined" && persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>  
      ) : (
        children
      )}
    </Provider>
  );
}
