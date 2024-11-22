import Button from "@components/Button";
import { onSubmit } from "src/utils/onSubmit";
import { Category } from "src/types/categories";
import useDelete from "../hooks/useDelete";

type Props = {
  category: Category;
};

function Delete({ category }: Props) {
  const {
    mutate: deleteMutation,
    isPending: isPendingDelete,
    error: errorDelete,
  } = useDelete();
  return (
    <form
      method="delete"
      className="p-4 flex flex-col gap-4"
      onSubmit={(e) => onSubmit(e, () => deleteMutation({ pk: category.pk }))}
    >
      <div role="alert" className="alert alert-warning">
        <svg
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>
          ¿Estás seguro de que deseas eliminar la categoría{" "}
          <strong>{category.name}</strong>? Esta acción no se puede deshacer.
        </span>
      </div>
      {errorDelete && (
        <div role="alert" className="alert alert-error">
          <span>{errorDelete.message}</span>
        </div>
      )}
      <Button
        type="submit"
        extraClassName="btn-error mx-auto"
        tag={"button"}
        disabled={isPendingDelete}
      >
        {isPendingDelete ? "Eliminando..." : "Eliminar"}
      </Button>
    </form>
  );
}

export default Delete;
