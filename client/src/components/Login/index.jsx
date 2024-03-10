import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { email, password },
      });
      console.log(data);
      //Save data objects to localStorage (token and username)
      if (data.login.token) {
        localStorage.setItem("token", data.login.token);
        localStorage.setItem("username", data.login.user.username);
      }
    } catch (err) {
      console.error(err);
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error :( Please try again</p>}
    </form>
  );
};
