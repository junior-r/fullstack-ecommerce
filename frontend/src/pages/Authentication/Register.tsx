import Button from "@components/Button";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router";
import api from "src/utils/api";

function Register() {
  const [loading, setLoading] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const image = imageRef.current?.value;

    if (!usernameRef || !email || !password) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.post(
        "/accounts/register/",
        {
          username,
          email,
          password,
          image,
        },
        { headers: { "Content-type": "multipart/form-data" } }
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="max-w-screen-xl mx-auto">
      <form
        method="post"
        encType="multipart/form-data"
        className="max-w-md mx-auto space-y-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex flex-col gap-4 items-center">
          <label htmlFor="image">Cargar imagen</label>
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/webp"
            className="file-input file-input-bordered w-full max-w-xs"
            ref={imageRef}
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="input input-bordered w-full"
            ref={usernameRef}
          />
        </div>
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
          {loading ? "Loading..." : "Register"}
        </Button>
      </form>
    </section>
  );
}

export default Register;
