import Banner from "./components/Banner/Banner";
import CategoryShowcase from "./components/CategoryShowcase/CategoryShowcase";
import Header from "./components/Header";
import "./page.css";

export default function Page() {
  return (
    <div>
      <div className="banner-header">
        <Header />
        <Banner />
      </div>
      <CategoryShowcase />
      <div className="row">
        <div className="col-3">
          <p>sidebar</p>
        </div>
        <div className="col-9"></div>
      </div>
    </div>
  );
}
