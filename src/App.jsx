import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout, selectUserData } from "./store/authSlice"
import { setTheme } from "./store/themeSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import service from './appwrite/config'
import { Permission, Role } from 'appwrite'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.theme || "light");

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          let theme = "light";
          let userDoc;

          try {
            userDoc = await service.databases.getDocument(
              import.meta.env.VITE_APPWRITE_DATABASE_ID,
              import.meta.env.VITE_APPWRITE_USERS_ID,
              user.$id
            );

            if (userDoc?.theme) {
              theme = userDoc.theme;
            }

          } catch (err) {
            if (err?.response?.status === 404) {
              try {
                const newUserDoc = await service.databases.createDocument(
                  import.meta.env.VITE_APPWRITE_DATABASE_ID,
                  import.meta.env.VITE_APPWRITE_USERS_ID,
                  user.$id,
                  {
                    email: user.email,
                    name: user.name,
                    theme: "light",
                  },
                  [
                    Permission.read(Role.user(user.$id)),
                    Permission.write(Role.user(user.$id)),
                  ]
                );

                theme = newUserDoc.theme;
              } catch (createErr) {
                console.error("Error creating user document:", createErr);
              }
            } else {
              console.error("Failed to fetch user theme:", err);
            }
          }

          dispatch(login({ userData: { userid: user.$id, name: user.name, email: user.email } }));
          dispatch(setTheme(theme));
        }
      } catch (err) {
        console.error("Auth error:", err);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [dispatch]);

useEffect(() => {
  if (!theme) return;

  console.log("🔥 Applying theme to <html>:", theme);
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
}, [theme]);


  return !loading ? (
    <div className="flex flex-col min-h-screen w-full bg-white text-black dark:bg-[#111827] dark:text-white transition-colors duration-300">
      <Header />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App
