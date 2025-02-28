interface WavePatternProps {
    className?: string;
    color?: string;
  }
  
  export default function WavePattern({ className = "", color = "#00312D" }: WavePatternProps) {
    return (
      <div className={`w-screen relative left-[50%] right-[50%] -mx-[50vw] ${className}`}>
        <svg
          viewBox="0 0 1440 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <path
            d="M0 150 
               C200 20, 300 20, 400 150 
               C500 280, 700 280, 800 150
               C900 20, 1100 20, 1200 150
               C1300 280, 1400 280, 1440 150 
               V250 H0Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }
  