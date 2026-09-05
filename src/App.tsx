import { HashRouter, Route, Routes } from 'react-router-dom'
import { ContactPage } from '@/pages/contact-page'
import { ProposalPage } from '@/pages/proposal-page'
import { PromptsPage } from '@/pages/prompts-page'
import { RegistrationFlowPage } from '@/pages/registration-flow-page'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RegistrationFlowPage />} />
        <Route path="/proposal" element={<ProposalPage />} />
        <Route path="/prompts" element={<PromptsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
