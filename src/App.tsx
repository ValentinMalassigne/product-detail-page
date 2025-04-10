import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductSelectionPage from './features/product_selection/ProductSelectionPage'
import ProductDetailsPage from './features/product_details/ProductDetailsPage'
import Header from './core/components/Header'

// Create theme with Rakuten colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#bf0000', // Rakuten red
    },
    secondary: {
      main: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Header />
            <Routes>
              <Route path="/" element={<ProductSelectionPage />} />
              <Route path="/product/:productId" element={<ProductDetailsPage />} />
            </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App