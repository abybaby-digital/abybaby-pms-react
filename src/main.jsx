import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "animate.css";

import "@fancyapps/ui/dist/fancybox/fancybox.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store.jsx";
import CryptoJS from "crypto-js";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
