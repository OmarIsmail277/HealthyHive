import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

// In the next lecture, we will start fetching some data.
// And so then that will show up right there in the Dev Tools. And this data will then be available because we provided it here using this,"QueryClientProvider." So again, just like we did with Redux and with the context API before. So a similar idea of having the data in one place and then providing it to the whole component tree.

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
export default App;
