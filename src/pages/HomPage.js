import Products from "../components/Products/Products";

function HomePage(props) {
  return (
    <main className="main">
      <div className="bgr">
        <div className="bgr__intro">
          <h3>NEW SEASON ARRIVALS</h3>
          <p>CHECK OUT ALL TRENDS </p>
        </div>
      </div>
      <Products />
    </main>
  );
}
export default HomePage;
