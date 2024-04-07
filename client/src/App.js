import './App.css';
import RoutPage from './RoutePage';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from './component/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flexContainer">
        <div className="leftSidebar">왼쪽</div>
        <div className="mainContent">
          <RoutPage />
        </div>
        <div className="rightContent">오른쪽</div>
      </div>
    </div>
  );
}

export default App;
