import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Meme {
  id: string;
  name: string;
  url: string;
}

const Page = async () => {
  const data = await fetch(`https://api.imgflip.com/get_memes`);
  const response = await data.json();
  console.log(response.data.memes);

  return (
    <>
      <h1 className="text-orange-600 text-6xl text-center font-extrabold my-8 shadow-lg p-6">
        Meme Maker
      </h1>
      <div className="flex justify-center gap-6 flex-wrap p-4">
        {response.data.memes.map((item: Meme) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105"
            style={{ width: "350px", height: "450px" }} // Set fixed width and height for uniformity
          >
            <Image
              src={item.url}
              alt={item.name}
              width={350}
              height={350}
              className="object-cover w-full h-64" // Ensures the image fills the card's height
            />
            <div className="p-4 text-center flex-grow"> {/* Added flex-grow to make this section occupy remaining space */}
              <h3 className="font-semibold text-xl text-gray-800 mb-2">{item.name}</h3> <br />
              <Link
                href={{
                  pathname: "creatememe",
                  query: { url: item.url, id: item.id },
                }}
              >
                <button className="btn btn-info">
                  Generate Meme
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
