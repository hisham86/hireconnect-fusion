
import { useRef, useEffect } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameRef = useRef<number>(0);
  const gridRef = useRef<Grid>({ lines: [], offset: 0 });
  const circlesRef = useRef<Circle[]>([]);
  const timeRef = useRef<number>(0);

  interface Grid {
    lines: { x1: number, y1: number, x2: number, y2: number }[];
    offset: number;
  }

  interface Circle {
    x: number;
    y: number;
    radius: number;
    color: string;
    speed: number;
    direction: number;
  }

  const generateGrid = (width: number, height: number) => {
    const grid: Grid = { lines: [], offset: 0 };
    const spacing = 80;
    const horizon = height * 0.6;
    
    // Horizontal lines (perspective)
    for (let y = horizon; y <= height + spacing; y += spacing) {
      grid.lines.push({
        x1: 0,
        y1: y,
        x2: width,
        y2: y
      });
    }
    
    // Vertical lines (perspective)
    const verticalCount = Math.ceil(width / spacing) + 1;
    for (let i = 0; i < verticalCount; i++) {
      const x = i * spacing;
      grid.lines.push({
        x1: x,
        y1: horizon,
        x2: x,
        y2: height
      });
    }

    return grid;
  };

  const generateCircles = (width: number, height: number) => {
    const circles: Circle[] = [];
    const count = Math.min(15, Math.floor((width * height) / 25000));
    
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 50 + 20;
      circles.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.5),
        radius,
        color: getVaporwaveColor(Math.random()),
        speed: Math.random() * 0.2 + 0.1,
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }
    
    return circles;
  };

  const getVaporwaveColor = (value: number) => {
    // Vaporwave palette: neon pinks, purples, cyans
    const colors = [
      'rgba(255, 107, 237, 0.3)',
      'rgba(127, 0, 255, 0.3)',
      'rgba(0, 255, 255, 0.3)',
      'rgba(255, 84, 141, 0.3)',
      'rgba(115, 221, 255, 0.3)',
      'rgba(184, 92, 255, 0.3)'
    ];
    
    return colors[Math.floor(value * colors.length)];
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, grid: Grid, width: number, height: number) => {
    const horizon = height * 0.6;
    
    // Draw sun/moon
    const gradientRadius = width * 0.15;
    const sunGradient = ctx.createRadialGradient(
      width / 2, horizon - gradientRadius / 2, 0,
      width / 2, horizon - gradientRadius / 2, gradientRadius
    );
    
    sunGradient.addColorStop(0, 'rgba(255, 120, 216, 1)');
    sunGradient.addColorStop(0.5, 'rgba(255, 84, 141, 0.8)');
    sunGradient.addColorStop(1, 'rgba(255, 84, 141, 0)');
    
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(width / 2, horizon - gradientRadius / 2, gradientRadius, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw gradient sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGradient.addColorStop(0, 'rgba(23, 11, 75, 0.8)');
    skyGradient.addColorStop(1, 'rgba(116, 42, 150, 0.7)');
    
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, horizon);
    
    // Draw ground gradient
    const groundGradient = ctx.createLinearGradient(0, horizon, 0, height);
    groundGradient.addColorStop(0, 'rgba(115, 221, 255, 0.7)');
    groundGradient.addColorStop(1, 'rgba(195, 66, 221, 0.8)');
    
    ctx.fillStyle = groundGradient;
    ctx.fillRect(0, horizon, width, height - horizon);
    
    // Draw grid lines with perspective effect
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    
    grid.lines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(line.x1, line.y1);
      ctx.lineTo(line.x2, line.y2);
      ctx.stroke();
    });
  };

  const drawCircles = (ctx: CanvasRenderingContext2D, circles: Circle[]) => {
    circles.forEach(circle => {
      ctx.fillStyle = circle.color;
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow effect
      const glowSize = circle.radius * 1.3;
      const glow = ctx.createRadialGradient(
        circle.x, circle.y, circle.radius * 0.5,
        circle.x, circle.y, glowSize
      );
      
      const color = circle.color.replace(/[\d.]+\)$/, '0.2)');
      glow.addColorStop(0, color);
      glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, glowSize, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const updateCircles = (circles: Circle[], width: number, deltaTime: number) => {
    circles.forEach(circle => {
      circle.x += circle.speed * circle.direction * deltaTime;
      
      // Reset position when off screen
      if (circle.x > width + circle.radius) {
        circle.x = -circle.radius;
      } else if (circle.x < -circle.radius) {
        circle.x = width + circle.radius;
      }
    });
  };

  const animate = (timestamp: number) => {
    if (!contextRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    const deltaTime = timestamp - (timeRef.current || timestamp);
    timeRef.current = timestamp;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update grid offset for perspective movement
    gridRef.current.offset = (gridRef.current.offset + 0.5) % 80;
    
    // Draw background elements
    drawGrid(ctx, gridRef.current, canvas.width, canvas.height);
    
    // Update and draw circles
    updateCircles(circlesRef.current, canvas.width, deltaTime / 16);
    drawCircles(ctx, circlesRef.current);
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const init = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    contextRef.current = ctx;
    
    gridRef.current = generateGrid(canvas.width, canvas.height);
    circlesRef.current = generateCircles(canvas.width, canvas.height);
    
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    init();
    
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      
      gridRef.current = generateGrid(canvasRef.current.width, canvasRef.current.height);
      circlesRef.current = generateCircles(canvasRef.current.width, canvasRef.current.height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 bg-transparent pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default InteractiveBackground;
