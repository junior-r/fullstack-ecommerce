import Button from "@components/Button";
import Loader from "@components/Loader";
import Modal from "@components/Modal";
import { useState } from "react";
import { usePaginationStore } from "src/store/Categories/pagination";
import { Category } from "src/types/categories";
import Create from "./forms/Create";
import Delete from "./forms/Delete";
import useGetList from "./hooks/useGetList";
import { useAuthenticationStore } from "src/store/Auth/authentication";
import { usePermission } from "src/hooks/usePermission";

const categorySkeleton: Category = {
  pk: "",
  name: "",
  created_at: new Date(),
  updated_at: new Date(),
};

function List() {
  const { data, isLoading, error, refetch } = useGetList();
  const setPage = usePaginationStore((state) => state.setPage);
  const isAuthorized = useAuthenticationStore((state) => state.isAuthorized);
  const [categoryToDelete, setCategoryToDelete] =
    useState<Category>(categorySkeleton);
  const openModal = (id: string) =>
    (document.getElementById(id) as HTMLDialogElement)?.showModal();
  const canCreate = usePermission("Categories.add_category") && isAuthorized;
  const canUpdate = usePermission("Categories.change_category") && isAuthorized;
  const canDelete = usePermission("Categories.delete_category") && isAuthorized;

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="overflow-x-auto w-full my-4">
            <table className="table">
              <caption>
                <section className="flex justify-between gap-4 flex-wrap">
                  <article>
                    <p>
                      <span>{data?.results.length}</span> Categorías
                    </p>
                  </article>
                  <article className="flex flex-wrap gap-2 ">
                    {canCreate && (
                      <Button
                        type="button"
                        extraClassName="btn-warning"
                        handleClick={() => openModal("createCategory")}
                      >
                        Crear
                      </Button>
                    )}
                    <Button
                      type="button"
                      extraClassName="btn-info"
                      handleClick={() => refetch()}
                    >
                      Recargar
                    </Button>
                  </article>
                </section>
              </caption>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha de creación</th>
                  <th>Fecha de actualización</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.results.map((item) => (
                  <tr className="hover" key={item.pk} id={item.pk}>
                    <th>{item.name}</th>
                    <td>{new Date(item.created_at).toDateString()}</td>
                    <td>{new Date(item.updated_at).toDateString()}</td>
                    <td>
                      <section className="flex flex-wrap gap-2">
                        {canUpdate && (
                          <>
                            <Button
                              type="button"
                              tag={"button"}
                              extraClassName="btn-primary btn-sm"
                            >
                              Editar
                            </Button>
                          </>
                        )}
                        {canDelete && (
                          <>
                            <Button
                              type="button"
                              tag={"button"}
                              extraClassName="btn-error btn-sm"
                              handleClick={() => {
                                setCategoryToDelete(item);
                                openModal("deleteCategory");
                              }}
                            >
                              Eliminar
                            </Button>
                          </>
                        )}
                      </section>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-4 items-center justify-center mt-4">
              <Button
                tag={"button"}
                disabled={!data?.previous}
                handleClick={() => setPage(data?.previous || null)}
              >
                Anterior
              </Button>
              <Button
                tag={"button"}
                disabled={!data?.next}
                handleClick={() => setPage(data?.next || null)}
              >
                Siguiente
              </Button>
            </div>
          </div>
          {canCreate && (
            <Modal id="createCategory" title="Crear una categoría">
              <Create />
            </Modal>
          )}
          {canDelete && (
            <Modal id="deleteCategory" title="Eliminar categoría">
              <Delete category={categoryToDelete} />
            </Modal>
          )}
        </>
      )}
    </>
  );
}

export default List;
