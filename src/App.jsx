import Home from "./pages/Home";
import { getInitialData,showFormattedDate } from "./utils";
function App() {
    return (
    <Home data={getInitialData()} formatDate={showFormattedDate}/>
    
    );
}
export default App;
