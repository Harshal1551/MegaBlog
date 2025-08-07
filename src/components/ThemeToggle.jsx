import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import service from '../appwrite/config';
import { selectUserData } from '../store/authSlice';
import conf from '../conf/conf';

function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const userData = useSelector(selectUserData);

  const handleToggle = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    // Step 1: Update Redux state
    dispatch(toggleTheme());
    console.log("Theme toggled in Redux:", newTheme);

       // 2. apply to <html> right away
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);

    // Step 2: Update Appwrite if userData and userid exist
    if (userData?.userid) {
      try {
        console.log("Trying to update theme in Appwrite...");
        await service.databases.updateDocument(
          conf.appwriteDatabaseId,
          conf.appwriteUsersId,
          userData.userid, // This is your Appwrite document ID
          { theme: newTheme }
        );
        console.log("✅ Theme updated in Appwrite successfully!");
      } catch (error) {
        console.error("❌ Failed to update theme in Appwrite:", error);
      }
    } else {
      console.warn("⚠️ userData.userid is missing. Skipping Appwrite theme update.");
    }
  };

  return (
  <button
      onClick={handleToggle}
      className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}

export default ThemeToggle;
