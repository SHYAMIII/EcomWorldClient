import connectDB from '@/app/lib/mongodb';
import Product from '@/app/models/Product';
import ProductList from '@/app/components/ProductList';

const NewProduct = async () => {
  await connectDB();
  const fetchdata = await fetch('/api/products');

};

export default NewProduct;
