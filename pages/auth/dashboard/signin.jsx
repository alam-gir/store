import LoaderSVG from "@/components/LoaderSVG";
import { useRouter } from "next/router";
import { useState } from "react";

const signin = () => {
  const initialInput = { email: "", password: "" };
  const [input, setInput] = useState(initialInput);
  const [isLoading, setLoading] = useState(false)



  const changeHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //start loading
    setLoading(true)

    // send request
    const res = await fetch("/api/auth/dashboard/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(input),
    });

    const data = await res.json();
    if (data.success) {
      // redirect to dashboard
      router.push('http://localhost:3000/dashboard')
      //empty form
      // setInput(initialInput);

    }
    if (!data.success) {
      console.log(data);
    }

    //stop loading
    setLoading(false)
  };

  return (
    <div>
      <form>
        <input
          onChange={changeHandler}
          type="email"
          placeholder="email"
          name="email"
          value={input.email}
        />
        <input
          onChange={changeHandler}
          type="password"
          placeholder="password"
          name="password"
          value={input.password}
        />
        <button onClick={handleSubmit} disabled={isLoading} type="submit">
          {isLoading ? <LoaderSVG color={"fill-gray-300"}/> : 'sign in'}
        </button>
      </form>
    </div>
  );
};

export default signin;
