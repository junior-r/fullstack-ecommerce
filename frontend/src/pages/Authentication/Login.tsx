import Button from "@components/Button";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthenticationStore } from "src/store/Auth/authentication";
import api from "src/utils/api";

function Login() {
  const [loading, setLoading] = useState(false);
  const setAccessToken = useAuthenticationStore(
    (state) => state.setAccessToken
  );
  const setRefreshToken = useAuthenticationStore(
    (state) => state.setRefreshToken
  );
  const setIsAuthorized = useAuthenticationStore(
    (state) => state.setIsAuthorized
  );
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    if (!email || !password) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.post("/token/", { email, password });
      if (response.status === 200) {
        const { access, refresh } = response.data;
        setAccessToken(access);
        setRefreshToken(refresh);
        setIsAuthorized(true);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-semibold text-center mt-8 mb-4">Login</h1>
      <form
        method="post"
        className="max-w-md mx-auto space-y-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input input-bordered w-full"
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input input-bordered w-full"
            ref={passwordRef}
          />
        </div>
        <Button
          type="submit"
          tag={"button"}
          extraClassName="btn-primary"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>
    </section>
  );
}

export default Login;
