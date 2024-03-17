import React from "react";
import { Signup } from "../components/Signup/index";
import { Login } from "../components/Login/index";

export default function Home() {
  return (
    <div className="bg-aggressive-body text-lightGreen font-bold min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-8">Welcome to the Furious Garden!</h1>
      <div className="rounded-xl border-4 border-darkGreen p-6 mb-4 text-white max-w-2xl bg-opacity-80 bg-black">
        <p className="text-center">
          Welcome to the Furious Garden. My name is Ryan and I'm an avid grower
          of plants of all kinds. It's a passion of mine and I enjoy growing the
          plants that are curious and tell a story. I'm passionate about all
          plants, from carnivorous plants to bonsai trees and I grow many of
          them. This is a store, but I intend for it to be much more than that.
          I hope you enjoy your visit and come back to see what new things I
          have in store. Stay tuned! - Ryan
        </p>
        <Signup />
      </div>
    </div>
  );
}
