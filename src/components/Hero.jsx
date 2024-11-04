import maiz from '../img/maiz.jpg';

export const Hero = () => {
  return (

    <>
    <section className="bg-white min-h-screen">
    
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        
        
        <div className="bg-[rgb(248,185,11)] text-left flex flex-col justify-center p-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Monitore Inteligente de Granos de Maíz
          </h1>
          <p className="text-lg md:text-xl text-black">
            Revoluciona el almacenamiento de tus granos con tecnología de punta. Controla calidad y cantidad desde tu smartphone.
          </p>
        </div>

   
        <div className="relative">
          <img
            src={maiz}  
            alt="Granos de Maíz"
            className="w-full h-full object-cover"/>
        </div>
      </div>

      
    </section>

    

    </>

    
  );
};