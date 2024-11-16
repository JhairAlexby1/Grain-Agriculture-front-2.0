import { GraphicGas } from "../components/GraphicsComponents/GraphicGas";
import { GraphicHumedad } from "../components/GraphicsComponents/GraphicHumedad";
import GraphicTemp from "../components/GraphicsComponents/GraphicTemp";
import GraphicTempInterna from "../components/GraphicsComponents/GraphicTempInterna";
import Menu from "../components/Menu";




export const Graphics = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <div className="p-4 flex-1 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Gráficos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
            <div className="w-full h-full">
              <GraphicTemp />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
            <div className="w-full h-full">
              <GraphicTempInterna />
            </div>
          </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
                <div className="w-full h-full">
                    <GraphicGas />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center">
            <div className="w-full h-full">
              <GraphicHumedad />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphics;