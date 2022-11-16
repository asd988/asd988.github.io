import { useState } from 'react';
import "./index.css"
import { UserContext, User, syncUser } from './context/UserContext';
import { Main } from "./components/Main"
import { useAsyncResource } from 'use-async-resource'
import { Callback } from './helper/auth';


const App = () => {
  if (window.location.pathname === "/callback") Callback()
  const [resource] = useAsyncResource(syncUser, [])
  const syncedData = resource()
  const [user, setUser] = useState(syncedData ? syncedData : new User())


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Main />
    </UserContext.Provider>
  );
}

export default App;
