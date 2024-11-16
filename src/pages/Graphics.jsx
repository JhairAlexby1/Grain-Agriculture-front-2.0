import Menu from "../components/Menu";

export const Graphics = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Gráficos</h1>
        <p>Contenido de gráficos vendrá aquí.</p>
      </div>
    </div>
  );
};

export default Graphics;