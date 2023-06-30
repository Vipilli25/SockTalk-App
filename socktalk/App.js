
import React from "react";
import HomeScreen from './screens/HomeScreen';

console.reportErrorsAsExceptions = false;  // this line is added to avoid the error: "Uncaught Error: Invariant Violation: Native module cannot be null."
export default function App() {

  return (
    <HomeScreen />
  );
}
