import LoaderSVG from "@/components/LoaderSVG";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFormik } from "formik";
import { fetchPOST } from "@/lib/fetch/fetch";
import Button from "@/components/Button";

const signin = () => {
  const initialResponse = {
    error: "",
    pending: false,
    success: false,
  };
  const router = useRouter();
  const [response, setResponse] = useState(initialResponse);

  //formik validation
  const validate = (values) => {
    const errors = {};
    // validation logic
    if (!values.email.trim()) {
      errors.email = "email required!";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "invalid email!";
    }
    if (!values.password.trim()) {
      errors.password = "password required!";
    } else if (values.password.length < 5) {
      errors.password = "password must be minimum 5 characters!";
    } else if (values.password.length > 16) {
      errors.password = "password must be less then 16 characters!";
    }
    //return errors
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      // start loading
      setResponse((prev) => ({ ...initialResponse, pending: true }));
      // send request for signin....
      fetchPOST("/api/auth/dashboard/signin", values)
        .then((data) => {
          if (data.status === "success") {
            // make response initialResponse
            setResponse(initialResponse);
            // redirect to the dashboard page
            router.push("http://localhost:3000/dashboard");
          } else {
            if (data.status === "notFound") {
              setResponse((prev) => ({
                ...prev,
                error: "wrong email or password!",
                pending: false,
              }));
            } else if (data.status === "error") {
              setResponse((prev) => ({
                ...prev,
                error: "something wrong please try again!",
                pending: false,
              }));
            }
          }
        })
        .catch((err) =>
          setResponse((prev) => ({
            ...prev,
            error: {
              ...prev.error,
              status: true,
              message: err.message,
            },
          }))
        )
        .finally(() => setResponse((prev) => ({ ...prev, pending: false })));
    },
  });

  return (
    <div>
      {/* sign in form */}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <Button
          text={
            response.pending ? <LoaderSVG color={"fill-gray-400"} /> : "sign in"
          }
          type="submit"
          bgColor="bg-[#e05914]"
          textColor="text-white"
          disable={response.pending}
        />
        {response.error ? (
          <div className="text-red-600">{response.error}</div>
        ) : null}
      </form>

      {/* //////////// */}
    </div>
  );
};

export default signin;
