import App from '../../App';
import { queryClient } from "../../lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function AppExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
