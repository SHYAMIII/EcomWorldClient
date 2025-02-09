import Link from 'next/link';
import Header from '../components/Header/page';
import Footer from '../components/Footer/page';

export default function About() {
  return (<>
    <Header/>
    <div className="p-10 h-[90vh]">
      <h1 className="text-3xl font-bold">About Us</h1>
      <p className="mt-5">
        We are a team of passionate developers who are dedicated to providing the best software solutions to our customers. 
        We are based in India and have been in the industry for over 10 Months.
      </p>
      <p className="mt-5">
        Our mission is to provide the best software solutions to our customers. 
        We are committed to delivering high-quality software products and services that meet our customers' needs.
      </p>
      <p className="mt-5">
        We provide a wide range of software solutions including web softwares, mobile app development, Web development, and software testing.
      </p>
      <Link href="/"
         className="text-blue-500 hover:text-blue-700">Back to Home
      </Link>
    </div>
    <Footer/>
         </>
  );
}