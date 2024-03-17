import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [addUser, { loading, error }] = useMutation(ADD_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    +console.log("Signup attempted with", { username, email, password });
    try {
      const { data } = await addUser({
        variables: { username, email, password },
      });
      +console.log("Signup successful with data:", data);
      -console.log(data);
      // Handle success here, for example by redirecting the user or showing a success message
    } catch (err) {
      console.error("Signup error", err);
      +console.log("Signup error details:", err);
      -console.log(err);
      // Handle the error more gracefully, show user-friendly error messages
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Signup</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: Please try again</p>}
    </form>
  );
};
