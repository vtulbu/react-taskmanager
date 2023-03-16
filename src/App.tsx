import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./styles/themes/fonts.css";

import { ThemeProvider } from "./providers/theme";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Button } from "./components/Button";
import { Checkbox } from "./components/Checkbox";
import { Layout } from "./components/Layout";
import { TextField } from "./components/TextField";
import { Dropdown } from "./components/Dropdown";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <ThemeSwitcher />
        <Button />
        <Checkbox checked name="testCheck" inputId="testCheck" />
        <TextField label="Test textfield label" helperText={"test helper"} />
        <Dropdown label="Test dropdown label" placeholder="Select an option" />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
