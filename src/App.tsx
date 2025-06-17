import { Route } from "react-router";
import { Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { supabase } from "./supabase-client";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import {
  ROUTE_COMMUNITY_CREATE,
  ROUTE_HOME,
  ROUTE_POST_CREATE,
  ROUTE_POST_DETAIL,
} from "./constants/router.constant";

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  //Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setUser]);

  return (
    <div className="min-h-screen bg-black text-gray-100 transition-opacity duration-700 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path={ROUTE_HOME} element={<HomePage />} />
          <Route path={ROUTE_POST_CREATE} element={<CreatePostPage />} />
          <Route path={ROUTE_POST_DETAIL} element={<PostPage />} />
          <Route
            path={ROUTE_COMMUNITY_CREATE}
            element={<CreateCommunityPage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
