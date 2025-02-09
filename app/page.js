// '@/app/page.js'
import Header from './components/Header/page';
import Featured from './components/Featured/page';
import Footer from './components/Footer/page';
import { CartProvider } from '@/app/components/CartContext';
import ProductList from './components/ProductList/page';

const Home = () => {

  return (
    
      <div className='bg-[#cecece] min-h-screen'>
        <Header />
        <Featured />
        <ProductList/>
        <Footer />
      </div>
  );
};

export default Home;
