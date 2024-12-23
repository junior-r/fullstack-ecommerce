import Button from "@components/Button";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import api from "src/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "src/consts";

const imageSchema = z
  .any()
  .optional()
  .refine(
    (file) =>
      file && file.length === 1
        ? ACCEPTED_IMAGE_TYPES.includes(file[0].type)
        : true,
    "Invalid file. Choose either JPEG or PNG image"
  )
  .refine(
    (file) =>
      file && file.length === 1 ? file[0].size <= MAX_FILE_SIZE : true,
    "Max file size allowed is 2MB"
  );

const schema = z.object({
  image: imageSchema,
  username: z
    .string()
    .min(3, { message: "Username must contain at least 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" }),
});

type responseError = {
  response: {
    data?: {
      username?: string[];
      email?: string[];
      password?: string[];
      image?: string[];
    };
  };
};

type FormFields = z.infer<typeof schema>;

function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      image: "",
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      const response = await api.postForm("/accounts/register/", formData);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      const errors = error as responseError;
      if (errors?.response) {
        const { data } = errors.response;
        if (!data) return;
        if (data.username) {
          setError("username", { message: data.username[0] });
        }
        if (data.email) {
          setError("email", { message: data.email[0] });
        }
        if (data.password) {
          setError("password", { message: data.password[0] });
        }
        if (data.image) {
          setError("image", { message: data.image[0] });
        }
      }
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto">
      <form
        method="post"
        className="max-w-md mx-auto space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <p className="text-red-500 text-center">
          {errors.root && errors.root.message}
        </p>
        <div className="flex flex-col gap-4 items-center">
          <label htmlFor="image">Cargar imagen</label>
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/webp"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register("image")}
          />
          <small className="text-red-500">
            {errors.image && errors.image.message?.toString()}
          </small>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username")}
            className="input input-bordered w-full"
          />
          <small className="text-red-500">
            {errors.username && errors.username.message}
          </small>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="input input-bordered w-full"
          />
          <small className="text-red-500">
            {errors.email && errors.email.message}
          </small>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="input input-bordered w-full"
          />
          <small className="text-red-500">
            {errors.password && errors.password.message}
          </small>
        </div>
        <Button
          type="submit"
          tag={"button"}
          extraClassName="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Register"}
        </Button>
      </form>
    </section>
  );
}

export default Register;
