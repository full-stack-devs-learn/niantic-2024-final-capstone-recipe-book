
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/shared/header/Header'
import Login from './components/authentication/login/Login'
import Register from './components/authentication/register/Register'
import RecipeDetails from './components/recipes/recipe-details/RecipeDetails'
import SearchRecipe from './components/recipes/search-recipe/SearchRecipe'
import RecipesPage from './components/recipes/recipes-page/RecipesPage'
import UserPage from './components/user-pages/user-page/UserPage'
import UserProfile from './components/user-pages/user-profile/UserProfile'
import PersonalLibrary from './components/user-pages/personal-library/PersonalLibrary'

function App() {

  return (
    <Router>
      <Header />

      <main className="container mt-4">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route path='/recipes' element={<RecipesPage />}>
          <Route path='' element={<SearchRecipe />} />
          <Route path=':id/details' element={<RecipeDetails />} />
          <Route path=':id/details/:isCustom' element={<RecipeDetails />} />
        </Route>

        <Route path='/user/:id' element={<UserPage />}>
          <Route path='profile' element={<UserProfile />} />
          <Route path='library' element={<PersonalLibrary />} />
        </Route>

      </Routes>
      </main>

      <footer>
        &copy; The Rolling Scones 2024
      </footer>

    </Router>
  )
}

export default App
