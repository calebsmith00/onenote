import { InteractionType } from '@azure/msal-browser'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { Link, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import Notebooks from './components/Notebooks'
import Notebook from './components/Notebook'
import Section from './components/Section'

function signInClickHandler(instance) {
  instance.loginPopup()
}

function SignInButton() {
  const { instance } = useMsal()

  return <button onClick={() => signInClickHandler(instance)}>Sign In</button>
}

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="user/onenote/notebooks" element={<Notebooks />} />
        <Route exact path="user/onenote/notebooks/notebook/:notebook" element={<Notebook />} />
        <Route exact path="user/onenote/notebooks/notebook/:notebook/:section" element={<Section />} />
      </Routes>

      <UnauthenticatedTemplate>
        <p>Welcome to the OneNote project. Please <SignInButton /> to continue with your project.</p>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
