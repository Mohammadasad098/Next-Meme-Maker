import Image from "next/image";
import React from "react";

interface Meme {
  id: string;
  name: string;
  url: string;
}

const page = async() => {
  const data = await fetch(`https://api.imgflip.com/get_memes`)
    const response = await data.json()
    console.log(response.data.memes)
  return (
    <>
      <h1 className="text-red-600 text-6xl text-center font-semibold my-8">
          Meme Maker
      </h1>
      <div className="flex justify-center gap-4 flex-wrap">
        {response.data.memes.map((item: Meme) => {
          return (
            <div
              key={item.id}
              className="flex justify-center gap-3 border-4 border-[#7a7a76]"
            >
              <Image
                src={item.url}
                alt={item.name}
                width={350}
                height={350}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default page


