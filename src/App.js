import { UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import Notebooks from './components/Notebooks'
import Notebook from './components/Notebook'
import Section from './components/Section'
import CreateNotebook from './components/CreateNotebook'

function SignInButton() {
  const { instance } = useMsal()

  return <button onClick={() => instance.loginPopup()}>Sign In</button>
}

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="user/onenote/notebooks" element={<Notebooks />} />
        <Route path="user/onenote/notebooks/notebook/:notebook" element={<Notebook />} />
        <Route path="user/onenote/notebooks/notebook/:notebook/:section" element={<Section />} />
        <Route path="admin/onenote/notebooks/create" element={<CreateNotebook />} />
      </Routes>

      <UnauthenticatedTemplate>
        <p>Welcome to the OneNote project. Please <SignInButton /> to continue with your project.</p>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
