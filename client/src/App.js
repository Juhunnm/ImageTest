import './App.css';
import RoutPage from './RoutePage';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from './component/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <RoutPage />
    </div>
  );
}

export default App;
