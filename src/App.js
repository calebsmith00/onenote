import { Providers, ProviderState } from '@microsoft/mgt-element'
import { Person, Login } from '@microsoft/mgt-react'
import { useEffect, useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import Notebooks from './components/Notebooks'
import Notebook from './components/Notebook'
import Section from './components/Section'

function App() {
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider

      setSignedIn(provider && provider.state === ProviderState.SignedIn)
    }

    Providers.onProviderUpdated(updateState)
    updateState()

    // Cleanup event listener
    return () => {
      Providers.removeProviderUpdatedListener(updateState)
    }
  })

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="user/onenote/notebooks" element={<Notebooks />} />
        <Route exact path="user/onenote/notebooks/notebook/:notebook" element={<Notebook />} />
        <Route exact path="user/onenote/notebooks/notebook/:notebook/:section" element={<Section />} />
      </Routes>

      {signedIn && 
        <h3>Thanks for signing in! Go ahead and view your <Link to={`/user/onenote/notebooks`}>notebooks</Link></h3>
      }

      {!signedIn &&
        <h3>Hello there!</h3> &&
        <p>Welcome to the OneNote project. Please <Login /> to continue with your project.</p>
      }
    </div>
  );
}

export default App;
