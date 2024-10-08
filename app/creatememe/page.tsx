"use client";

import Image from 'next/image';
import React, { useRef, useState } from 'react';

const CreateMeme = ({ searchParams }: { searchParams: { id: string; url: string } }) => {
    const [meme, setMeme] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const text1 = useRef<HTMLInputElement>(null);
    const text2 = useRef<HTMLInputElement>(null);

    const createMeme = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!text1.current?.value && !text2.current?.value) {
            alert("Please enter text for at least one field.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const data = await fetch(`https://api.imgflip.com/caption_image?template_id=${searchParams.id}&username=mabdullah6600&password=asdfgfdsa123&text0=${text1.current?.value}&text1=${text2.current?.value}`, {
                method: 'POST'
            });

            const response = await data.json();

     
            if (response.success) {
                setMeme(response.data.url);

                if (text1.current) text1.current.value = '';
                if (text2.current) text2.current.value = '';
            } else {
                setError("Failed to create meme. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while creating the meme.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="text-center my-8">
                <h1 className="text-4xl font-extrabold text-orange-500 mb-4">Create Your Meme</h1>
                <div className="flex justify-center">
                    <Image src={searchParams.url} width={400} height={400} alt='meme template' className="rounded-lg shadow-lg" />
                </div>
            </div>

            <form onSubmit={createMeme} className="flex flex-col items-center gap-4">
                <input 
                required
                    type="text" 
                    placeholder='Enter text 1' 
                    ref={text1} 
                    className="border border-gray-300 rounded-md p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-orange-500 transition duration-200" 
                />
                <input
                required 
                    type="text" 
                    placeholder='Enter text 2' 
                    ref={text2} 
                    className="border border-gray-300 rounded-md p-2 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-orange-500 transition duration-200" 
                />
                <button 
                    type='submit' 
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-md transition duration-300 shadow"
                    disabled={loading} 
                >
                    {loading ? "Creating..." : "Create Meme"}
                </button>
            </form>

            {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

            {meme && (
                <div className="mt-8 text-center">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Created Meme</h2>
                    <div className="flex justify-center">
                        <Image src={meme} width={400} height={400} alt='generated meme' className="rounded-lg shadow-lg" />
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateMeme;
