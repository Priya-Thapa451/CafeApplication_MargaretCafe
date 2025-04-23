import barista from "../../assets/Barista.png";
import bakery from "../../assets/Bakery.png";

export default function OurCourses() {
  return (
    <div className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold mb-6 text-center text-gray-800 font-playfair animate-bounce">
        Our Courses
      </h1>
      <p className="text-center text-lg text-gray-600 mb-12 font-opensans max-w-3xl mx-auto">
        
      </p>

      <div className="space-y-20">
        {/* Barista Training */}
        <div className="bg-white rounded-2xl shadow-lg  transition-shadow duration-300 flex flex-col md:flex-row items-center p-6 gap-6">
          <img
            src={barista}
            alt="Barista Training"
            className="w-full md:w-1/2 h-96 object-cover rounded-xl"
          />
          <div className="flex flex-col justify-center md:w-1/2 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-800 font-playfair">
              Barista Training
            </h2>
            <div className="h-1 w-20 bg-yellow-400 rounded"></div>
            <p className="text-gray-700 font-opensans text-base leading-relaxed">
              Barista training is a structured process that equips individuals with the skills and knowledge required to prepare high-quality coffee beverages and provide excellent customer service. It begins with an introduction to coffee, covering its origins, bean varieties, and the impact of roasting on flavor. Trainees learn to operate espresso machines, grind beans to the correct consistency, and master the techniques of dosing, tamping, and extracting espresso. Milk steaming and texturing are also key components, including the creation of microfoam and basic latte art. In addition to technical proficiency, baristas are trained in hygiene, equipment maintenance, and customer interaction. Emphasis is placed on consistency, speed, and attention to detail. A solid understanding of coffee and its preparation allows baristas to craft beverages that meet high standards while enhancing the customer experience. Advanced training may include sensory evaluation, manual brewing methods, and specialty coffee knowledge, forming a foundation for professional growth in the coffee industry.
            </p>
          </div>
        </div>

        {/* Bakery Training */}
        <div className="bg-white rounded-2xl shadow-lg transition-shadow duration-300 flex flex-col md:flex-row-reverse items-center p-6 gap-6">
          <img
            src={bakery}
            alt="Bakery Training"
            className="w-full md:w-1/2 h-96 object-cover rounded-xl"
          />
          <div className="flex flex-col justify-center md:w-1/2 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-800 font-playfair">
              Bakery Training
            </h2>
            <div className="h-1 w-20 bg-pink-400 rounded"></div>
            <p className="text-gray-700 font-opensans text-base leading-relaxed">
              Bakery training is a structured program that teaches the fundamental skills and techniques required to produce a wide range of baked goods. It begins with an understanding of essential ingredients such as flour, yeast, sugar, eggs, and butter, and how they interact during the baking process. Trainees learn methods for mixing, kneading, proofing, and baking, as well as how to use equipment like ovens, mixers, and proofing cabinets. The training covers a variety of products including breads, pastries, cookies, and cakes, with a focus on consistency, flavor, texture, and presentation. Hygiene, food safety, and kitchen organization are also emphasized to maintain high standards of cleanliness and efficiency. Additionally, bakery training often includes basic decoration techniques, time management, and recipe scaling. This comprehensive knowledge allows bakers to create both traditional and innovative baked goods, preparing them for roles in professional bakeries, cafés, or independent baking ventures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
