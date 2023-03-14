import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { ThemeProvider } from "./providers/theme";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Button } from "./components/Button";

function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      <Button />
    </ThemeProvider>
  );
}

export default App;
