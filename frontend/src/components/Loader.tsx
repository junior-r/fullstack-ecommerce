function Loader() {
  return (
    <div className="card bg-base-100 w-96 shadow-xl mx-auto my-6">
      <div className="card-body items-center">
        <h2 className="card-title text-center">
          Espera mientras cargamos todo
        </h2>
        <div className="card-actions justify-end">
          <span className="loading loading-spinner loading-lg mx-auto"></span>
        </div>
      </div>
    </div>
  );
}

export default Loader;
