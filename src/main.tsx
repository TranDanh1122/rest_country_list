import { createRoot } from 'react-dom/client'
import ThemeProvider from './context/ThemeContext.tsx'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
 
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
)
