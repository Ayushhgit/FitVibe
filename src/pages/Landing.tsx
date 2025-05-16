import React, { useState, useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useTexture } from '@react-three/drei';
import { Brush, Sparkles, Shirt, Heart, User, Settings, Wand2, Moon, Sun } from 'lucide-react';

// Theme Toggle Component
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
    // In a real implementation, this would toggle dark mode classes
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <button 
      onClick={toggleTheme}
      className="rounded-full p-2 hover:bg-fashion-purple/20 transition-colors"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-fashion-purple" />
      ) : (
        <Moon className="h-5 w-5 text-fashion-purple" />
      )}
    </button>
  );
};

// Button Component
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseStyles = "font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  
  const sizeStyles = {
    default: "h-10 px-4 py-2",
    icon: "h-10 w-10 p-0",
  };
  
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
};

// TypeAnimation Component (simplified version)
const TypeAnimation = ({ sequence, wrapper, speed, className, repeat }) => {
  const [currentText, setCurrentText] = useState(sequence[0]);
  const currentIndex = useRef(0);
  const timeoutRef = useRef(null);

  React.useEffect(() => {
    const nextInSequence = () => {
      const nextIndex = (currentIndex.current + 2) % sequence.length;
      currentIndex.current = nextIndex;
      
      setCurrentText(sequence[nextIndex]);
      
      timeoutRef.current = setTimeout(nextInSequence, sequence[nextIndex + 1] || 1000);
    };
    
    timeoutRef.current = setTimeout(nextInSequence, sequence[1]);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [sequence, repeat]);
  
  const Wrapper = wrapper || 'span';
  
  return <Wrapper className={className}>{currentText}</Wrapper>;
};

// Motion components (simplified versions)
const motion = {
  div: ({ 
    children, 
    initial, 
    animate, 
    transition, 
    whileHover, 
    whileTap, 
    className, 
    onClick 
  }) => {
    const [isHover, setIsHover] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    
    let style = {};
    
    if (isHover && whileHover) {
      style = { ...style, ...whileHover };
    }
    
    if (isPressed && whileTap) {
      style = { ...style, ...whileTap };
    }
    
    return (
      <div 
        className={className}
        onClick={onClick}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          transform: `scale(${style.scale || 1})`,
          opacity: animate?.opacity !== undefined ? animate.opacity : 1,
          transition: 'all 0.3s ease'
        }}
      >
        {children}
      </div>
    );
  },
  button: ({ 
    children, 
    whileHover, 
    whileTap, 
    className 
  }) => {
    const [isHover, setIsHover] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    
    let style = {};
    
    if (isHover && whileHover) {
      style = { ...style, ...whileHover };
    }
    
    if (isPressed && whileTap) {
      style = { ...style, ...whileTap };
    }
    
    return (
      <button 
        className={className}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          transform: `scale(${style.scale || 1})`,
          transition: 'all 0.2s ease'
        }}
      >
        {children}
      </button>
    );
  }
};

// AnimatePresence component (simplified)
const AnimatePresence = ({ children }) => {
  return <>{children}</>;
};

// Falling Clothes Component
function FallingClothes() {
  const clothesItems = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const x = Math.random() * 20 - 10;
      const y = Math.random() * 30 + 10;
      const z = Math.random() * 10 - 5;
      
      return {
        key: i,
        position: [x, y, z],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        speed: Math.random() * 0.05 + 0.01
      };
    });
  }, []);

  return (
    <>
      {clothesItems.map((cloth) => (
        <ClothItem 
          key={cloth.key} 
          position={cloth.position}
          rotation={cloth.rotation}
          speed={cloth.speed}
        />
      ))}
    </>
  );
}

function ClothItem({ position, rotation, speed }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Falling animation
      meshRef.current.position.y -= speed;
      
      // Rotate slightly
      meshRef.current.rotation.x += speed * 0.5;
      meshRef.current.rotation.y += speed * 0.3;

      // Reset position if fallen too low
      if (meshRef.current.position.y < -10) {
        meshRef.current.position.y = 20;
        meshRef.current.position.x = Math.random() * 20 - 10;
        meshRef.current.position.z = Math.random() * 10 - 5;
      }
    }
  });

  return (
    <mesh 
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={0.5}
    >
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial 
        color="#8b5cf6" 
        transparent 
        opacity={0.3} 
      />
    </mesh>
  );
}

// Background Canvas Component
function ClothBackground() {
  return (
    <Canvas 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0 
      }}
      camera={{ position: [0, 0, 10], fov: 45 }}
    >
      <color attach="background" args={['#f0f4f8']} />
      <ambientLight intensity={0.5} />
      <FallingClothes />
    </Canvas>
  );
}

const Landing = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Wand2 className="h-8 w-8 text-purple-600" />,
      title: "AI Style Generator",
      description: "Get personalized outfit recommendations powered by AI.",
      color: "bg-purple-100"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      title: "Virtual Wardrobe",
      description: "Digitize and organize your entire clothing collection.",
      color: "bg-blue-100"
    },
    {
      icon: <Heart className="h-8 w-8 text-purple-600" />,
      title: "Social Styling",
      description: "Share and get feedback on your outfit combinations.",
      color: "bg-pink-100"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Canvas with Falling Clothes */}
      <div className="absolute inset-0 opacity-20">
        <Suspense fallback={null}>
          <ClothBackground />
        </Suspense>
      </div>

      {/* Header */}
      <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-7xl rounded-full bg-white/30 dark:bg-gray-900/60 backdrop-blur-lg shadow-xl border border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center">
        <div className="flex items-center gap-2">
          <Brush className="h-6 w-6 text-purple-600" />
          <div className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-purple-400 text-transparent bg-clip-text">FitVibe</div>
          <span className="hidden sm:block text-sm px-3 py-1 bg-purple-200 text-purple-700 rounded-full font-semibold">Beta</span>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full transition-all duration-300 hover:bg-purple-200"
          >
            <User className="h-5 w-5 text-purple-600" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full transition-all duration-300 hover:bg-purple-200"
          >
            <Settings className="h-5 w-5 text-purple-600" />
          </Button>
          <span className="flex items-center justify-center">
            <ThemeToggle />
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex items-center pt-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center md:text-left relative z-20"
          >
            <TypeAnimation
              sequence={[
                'Create Your Perfect Style',
                1000,
                'Design Dream Outfits',
                1000,
                'Express Yourself Uniquely',
                1000
              ]}
              wrapper="h1"
              speed={50}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 dark:text-white"
              repeat={Infinity}
            />
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              AI-powered fashion design meets personal expression. Mix, match, and reimagine your style.
            </p>
            
            <div className="flex gap-4 justify-center md:justify-start">
              <a href='/create'><motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Start Styling
              </motion.button> </a>
            </div>
          </motion.div>

          {/* Feature Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 relative z-20"
          >
            <AnimatePresence>
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: activeFeature === index ? 1 : 0.5, 
                    x: activeFeature === index ? 0 : 20 
                  }}
                  onClick={() => setActiveFeature(index)}
                  className={`cursor-pointer p-6 rounded-xl transition-all ${feature.color} ${
                    activeFeature === index ? 'shadow-lg' : 'hover:shadow'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {feature.icon}
                    <div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Landing;