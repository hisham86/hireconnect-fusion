
import { useRef, useEffect } from 'react';

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  interface Particle {
    x: number;
    y: number;
    size: number;
    baseX: number;
    baseY: number;
    density: number;
    color: string;
  }

  const init = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    contextRef.current = ctx;

    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 3 + 1;
      const x = Math.random() * (canvas.width - size * 2) + size;
      const y = Math.random() * (canvas.height - size * 2) + size;
      const density = Math.random() * 30 + 5;
      const opacity = Math.random() * 0.5 + 0.2;
      const hue = Math.random() * 60 + 220; // Blue to purple range
      
      particles.push({
        x,
        y,
        size,
        baseX: x,
        baseY: y,
        density,
        color: `hsla(${hue}, 80%, 60%, ${opacity})`,
      });
    }
    
    particlesRef.current = particles;
    animate();
  };

  const animate = () => {
    if (!contextRef.current || !canvasRef.current) return;
    
    const ctx = contextRef.current;
    const canvas = canvasRef.current;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach((particle) => {
      // Calculate distance between mouse and particle
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      
      // Max distance past which the particle is not affected by mouse
      const maxDistance = 150;
      const force = (maxDistance - distance) / maxDistance;
      
      // If we're close enough, move the particle
      if (distance < maxDistance) {
        particle.x -= forceDirectionX * force * particle.density;
        particle.y -= forceDirectionY * force * particle.density;
      }
      
      // Move particles back to their original position
      const dx2 = particle.baseX - particle.x;
      const dy2 = particle.baseY - particle.y;
      const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      
      const returnSpeed = distance2 * 0.01;
      
      if (distance2 > 0.5) {
        particle.x += (dx2 / distance2) * returnSpeed;
        particle.y += (dy2 / distance2) * returnSpeed;
      }
      
      // Draw the particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Connect particles with lines if they're close
      connectParticles(particle);
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const connectParticles = (p1: Particle) => {
    if (!contextRef.current) return;
    
    const ctx = contextRef.current;
    
    particlesRef.current.forEach((p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 120) {
        // Draw line between particles
        ctx.beginPath();
        ctx.strokeStyle = `rgba(120, 90, 255, ${0.2 - distance / 1000})`;
        ctx.lineWidth = 0.3;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    });
  };

  useEffect(() => {
    init();

    const handleResize = () => {
      if (!canvasRef.current) return;
      
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
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
