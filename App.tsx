import { config } from "@gluestack-ui/config";
import { Box, GluestackUIProvider, Text, StatusBar } from "@gluestack-ui/themed";
import { ScrollView, ImageBackground } from "react-native";
import ChooseAvatar from "./screens/ChooseAvatar";
import Home from "./screens/Home";
import FindOpponent from "./screens/FindOpponent";
import { QueryClient, QueryClientProvider } from "react-query";
import Auth from "./screens/Auth";
import Question from "./screens/question";
import WinnerScreen from "./screens/WinnerScreen";

const queryClient = new QueryClient();

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WinnerScreen />
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
