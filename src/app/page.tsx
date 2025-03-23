"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);

    try {
      const res = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      // if (!res.ok) {
      //   throw new Error("Failed to fetch response");
      // }

      if (res.status === 401) {
        setResponse("Unauthorized. Please sign in to roast your code.");
        return;
      }

      const data = await res.json();
      setResponse(data.response); // Assuming the API sends a response object
    } catch (error) {
      console.error(error);
      setResponse("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
        Get your code <span className="text-red-500">roasted</span> by AI 🔥
      </h1>
      <p className="text-center text-lg text-gray-700 hidden md:block mb-6">
        Get roasted by AI and learn how to write better code, but don`&apos;`t
        worry, we`&apos;`ll be gentle.
      </p>

      {/* Form and Code Input */}

      <div className="flex md:flex-row flex-col space-x-4 space-y-3 md:space-y-0 justify-center min-h-[65vh] w-[90vw]">
        <form className="bg-gray-50 p-6  border-black border rounded-lg min-h-[100%] w-full ">
          <label
            htmlFor="prompt"
            className="block text-lg text-center font-medium text-gray-700 mb-2"
          >
            Enter your code:
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your code here..."
            required
            className="w-full p-4 border-none focus:border-none active:border-none border-gray-300 rounded-lg focus:outline-none   mb-4"
          />
        </form>
        <div className="min-h-[100%] border border-red-500 rounded-md w-full">
          <div
            className={`${
              loading ? "blur-xs" : "blur-0"
            }  md:h-full min-h-[300px] relative   p-6 w-full  `}
          >
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
              Your Roast:
            </h2>
            {/* <p className="text-gray-600">
              {!response || "Awaiting your code..."}
            </p> */}
            {response && (
              <div dangerouslySetInnerHTML={{ __html: response }}></div>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
        className={`py-2 text-white font-semibold mt-2 md:mt-4 w-[80%] md:w-[50%] mx-auto rounded-lg ${
          loading ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
        } focus:outline-none`}
      >
        {loading ? "Roasting..." : "Roast My Code"}
      </button>

      {/* Response Area */}
    </div>
  );
}
