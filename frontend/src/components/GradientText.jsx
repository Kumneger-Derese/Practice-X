const GradientHeading = ({ children, className }) => {
  return (
    <h1
      className={`text-2xl font-bold my-4 bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </h1>
  );
};
const GradientHeading2 = ({ children, className }) => {
  return (
    <h1
      className={`text-xl font-bold my-4 bg-gradient-to-r from-indigo-500 to-purple-800 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </h1>
  );
};

const GradientText = ({ children, className }) => {
  return (
    <h1
      className={`inline-block font-bold bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </h1>
  );
};

const HeroText = ({ children, className }) => {
  return (
    <div
      className={`bg-gradient-to-r from-purple-600 to-indigo-700 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </div>
  );
};
export { GradientText, GradientHeading, GradientHeading2, HeroText };
