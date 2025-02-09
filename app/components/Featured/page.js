import Link from 'next/link';
import React from 'react';

const Featured = () => {
  return (
    <div className="bg-[#040846] mx-auto flex justify-center">
      <div className="bg-[#040846] w-full mx-auto max-w-[950px] px-4 py-8 md:py-12 md:px-6 lg:px-8 flex flex-col md:grid md:grid-cols-2 md:gap-8">
        <div className="flex mx-auto flex-col mb-6 md:mb-0">
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-200 font-bold">
            Premium Software Hub:
          </h1>
          <p className="text-gray-400 text-sm md:text-base mt-3">
            Welcome to Premium Software Hub, the ultimate destination for top-tier professional software solutions. We offer a curated selection of industry-leading paid applications designed to meet the diverse needs of professionals across various fields. Our platform ensures secure transactions, instant downloads, and dedicated customer support to enhance your purchasing experience. Discover the tools that can elevate your productivity and efficiency today.
          </p>
          <Link href="/AllProducts"
           className="text-white text-sm md:text-base mt-3 bg-sky-900 w-fit px-3 py-2 rounded-lg">
              Read More
          
          </Link>
        </div>
        <div className="flex mx-auto p-1 rounded-lg overflow-hidden justify-center md:w-[592px] md:justify-end">
          <img
            className=" h-auto max-w-full rounded-lg overflow-hidden  hover:scale-105 hover:shadow-2xl transition-all"
            src="/software.jpg"
            alt="Software"
          />
        </div>
      </div>
    </div>
  );
};

export default Featured;
