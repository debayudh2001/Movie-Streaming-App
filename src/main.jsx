import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store.js";
import MovieDetails from "./pages/MovieDetails.jsx";
import WatchMovie from "./pages/WatchMovie.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import WatchListPage from "./pages/WatchListPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movie-details" element={<MovieDetails />} />
        <Route path="/watch-movie" element={<WatchMovie />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/watchlist" element={<WatchListPage />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
