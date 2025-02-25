import Footer from "../components/Footer/page";
import Header from "../components/Header/page";
import Products from "../components/Products/page";

export default function Page() {
  return (
    <div className="w-full">
      <Header />
      <Products />
      <Footer />
    </div>
  );
}
