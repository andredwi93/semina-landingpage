import { useRouter } from "next/router";
import React, { useState } from "react";
import { postData } from "../../utils/fetchData";
import Button from "../Button";
import TextInput from "../TextInput";
import Cookies from "js-cookie";

export default function FormSigIn() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await postData('api/v1/participants/auth/signin', form)
      Cookies.set('token', res.data.token)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <form className="form-login d-flex flex-column mt-4 mt-md-0 p-30">
      <TextInput
        placeholder="semina@bwa.com"
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <TextInput
        placeholder="Type your password"
        label="Password"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />

      <div className="d-grid mt-2 gap-4">
        <Button variant={"btn-green"} action={() => handleSubmit()}>
          Sign In
        </Button>

        <Button action={() => router.push("/signup")} variant="btn-navy">
          Create New Account
        </Button>
      </div>
    </form>
  );
}
