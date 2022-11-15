import { useState } from 'react';
import "./index.css"
import { UserContext, User, syncUser } from './context/UserContext';
import { Dashboard } from "./components/Dashboard"
import { useAsyncResource } from 'use-async-resource'
import { Callback } from './helper/auth';


const App = () => {
  if (window.location.pathname === "/callback") Callback()
  const [resource] = useAsyncResource(syncUser, [])
  const syncedData = resource()
  const [user, setUser] = useState(syncedData ? syncedData : new User())


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </UserContext.Provider>
  );
}

export default App;
