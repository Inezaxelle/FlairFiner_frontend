import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Messaging from "./components/messaging/Messaging";
import Categories from "./components/categories/Categories";
import Welcome from "./components/welcome/Welcome";
import Login from "./components/Login/Login";
("./components/signup/Signup");
import Events from "./components/events/Events";
import Dashboard from "./pages/Dashboard";
import Vid from "./components/video/vid";
import Settings from "./components/settings/Settings";
import { useState } from "react";
import PerformerProfile from "./components/performerprofile/PerformerProfile";
import UserProfile from "./components/userprofile/userProfile";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Stories from "./components/stories/Stories";
import VideoGrid from "./components/videogrid/VideoGrid";
import videos from "./Videos";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en");

  const handleDarkModeChange = (value: boolean) => {
    setDarkMode(value);
  };

  const handleNotificationsChange = (value: boolean) => {
    setNotifications(value);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route path='' element={
            <div className="w-full col-span-2 grid place-items-center max-h-screen overflow-y-scroll">
              <Stories />
              <VideoGrid videos={videos}/>
            </div>
          } />
          <Route
            path="performer"
            element={
              <PerformerProfile
          
           
              />
            }
          ></Route>
          <Route
            path="user"
            element={
              <UserProfile
                profilePictureUrl="https://source.unsplash.com/random/100x100"
                bio="Until I make you mine"
                admirers={120}
                admiring={20}
                posts={4}
                saved={6}
              />
            }
          ></Route>
          <Route path="categories" element={<Categories />} />
          <Route path="events" element={<Events numEvents={5} />} />
          <Route path="onelive" element={<Vid />}/>
        </Route>
          <Route
            path="/settings"
            element={
              <Settings
                darkMode={darkMode}
                notifications={notifications}
                language={language}
                onDarkModeChange={handleDarkModeChange}
                onNotificationsChange={handleNotificationsChange}
                onLanguageChange={handleLanguageChange}
              />
            }
           />
        <Route path="signup" element={<Signup />}></Route>
        <Route path="chat" element={<Messaging />}></Route>
        <Route path="login" element={<Login />} />
        <Route />
        <Route />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
