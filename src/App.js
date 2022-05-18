import { UnauthenticatedTemplate, useMsal } from '@azure/msal-react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import Notebooks from './components/Notebooks'
import Notebook from './components/Notebook'
import Section from './components/Section'
import CreateNotebook from './components/CreateNotebook'
import Template from './components/Template/Template'
import AddTraining from './components/Template/AddTraining'

function SignInButton() {
  const { instance } = useMsal()

  return <button onClick={() => instance.loginPopup()}>Sign In</button>
}

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Homepage />} />

        {/* USER ROUTES */}
        <Route path="user/:userId/onenote/notebooks" element={<Notebooks />} />
        <Route path="user/:userId/onenote/notebooks/notebook/:notebook" element={<Notebook />} />
        <Route path="user/:userId/onenote/notebooks/notebook/:notebook/:section" element={<Section />} />

        {/* ADMIN ROUTES */}
        <Route path="admin/onenote/template/create" element={<Template />} />
        <Route path="admin/onenote/template/add/trainings" element={<AddTraining />} />
        <Route path="admin/onenote/notebooks/create" element={<CreateNotebook />} />
      </Routes>

      <UnauthenticatedTemplate>
        <p>Welcome to the OneNote project. Please <SignInButton /> to continue with your project.</p>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
