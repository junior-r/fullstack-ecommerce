import Button from "@components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { categorySchema } from "src/validations/categorySchema";
import useCreate from "../hooks/useCreate";

type Inputs = {
  categoryName: string;
};

function Create() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(categorySchema),
  });

  const {
    mutate: createMutation,
    isPending: isPendingCreate,
    error: errorCreate,
  } = useCreate();

  const onSubmit = (data: Inputs, e: FormEvent<HTMLFormElement>) => {
    createMutation({ pk: "", name: data.categoryName });
    const form = e.target as HTMLFormElement;
    const modal = form.parentElement?.parentElement as HTMLDialogElement;
    form.reset();
    modal.close();
  };

  return (
    <form
      method="post"
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit((data) => onSubmit(data, e))(e);
      }}
    >
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Nombre</span>
        </div>
        <input
          required
          type="text"
          placeholder="Escribe el nombre aquí"
          className="input input-bordered w-full max-w-xs"
          {...register("categoryName")}
          id="categoryName"
        />
        {errors.categoryName?.message && (
          <div className="label">
            <span className="label-text-alt">
              {errors.categoryName?.message}
            </span>
          </div>
        )}
      </label>
      {errorCreate && <span>{errorCreate.message}</span>}
      <div className="flex gap-4 justify-end">
        <Button
          extraClassName="btn-error"
          handleClick={() => reset()}
          type="reset"
        >
          Limpiar
        </Button>
        <Button
          extraClassName="btn-warning"
          disabled={isPendingCreate}
          type="submit"
        >
          {isPendingCreate ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}

export default Create;
