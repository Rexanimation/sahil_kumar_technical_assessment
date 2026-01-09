import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { AuthModal } from '@/components/AuthModal';
import { useToast } from "@/components/ui/use-toast";
import {
  Workflow,
  Zap,
  GitBranch,
  Type,
  ArrowRight,
  Bot,
  Calculator,
  Clock,
  Sparkles,
  Layers,
  CheckCircle,
  Cpu,
  Gauge,
  Shield,
  Lock,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const features = [
  {
    icon: Layers,
    title: 'Scalable Architecture',
    description: 'Handle 1000s of nodes without performance degradation.',
  },
  {
    icon: GitBranch,
    title: 'DAG Validation',
    description: 'Real-time cycle detection for valid pipeline structures.',
  },
  {
    icon: Type,
    title: 'Dynamic Variables',
    description: 'Template syntax with auto-generated input handles.',
  },
  {
    icon: Gauge,
    title: 'Performance Optimized',
    description: 'GPU acceleration and virtualized rendering.',
  },
];

const nodeTypes = [
  { icon: Workflow, label: 'Input', color: 'text-success' },
  { icon: Bot, label: 'LLM', color: 'text-warning' },
  { icon: Type, label: 'Text', color: 'text-primary' },
  { icon: Calculator, label: 'Math', color: 'text-destructive' },
  { icon: GitBranch, label: 'Condition', color: 'text-yellow-400' },
  { icon: Clock, label: 'Delay', color: 'text-cyan-400' },
];

const benefits = [
  { icon: Cpu, text: 'Industry Ready' },
  { icon: Shield, text: 'Type Safe' },
  { icon: Zap, text: 'Lightning Fast' },
  { icon: Layers, text: 'Scalable' },
];

// Animated text with stagger
const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// Floating animation
const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{ y: [0, -12, 0] }}
    transition={{ duration: 4, repeat: Infinity, delay, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    if (searchParams.get('auth') === 'delete_success') {
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      });
      // cleanup url
      window.history.replaceState({}, '', '/');
    }
  }, [searchParams, toast]);

  const openAuth = (tab: 'signin' | 'signup') => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-background overflow-x-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(265 89% 62% / 0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(199 89% 52% / 0.1) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(230 25% 15%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(230 25% 15%) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.div
              className="p-2.5 bg-primary/10 rounded-xl border border-primary/20"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Workflow className="w-6 h-6 text-primary" />
            </motion.div>
            <div>
              <span className="font-display font-bold text-xl">Pipeline Builder</span>
              <p className="text-xs text-muted-foreground font-mono">v2.0 Industry Ready</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => openAuth('signin')}>
              Sign In
            </Button>
            <Button onClick={() => openAuth('signup')}>
              Sign Up
            </Button>
          </div>
        </div>
      </motion.header>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab={authTab}
      />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col relative">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto px-6 py-24 flex-1"
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <FloatingElement>
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 text-primary mb-10">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  <span className="font-semibold text-sm">Visual Workflow Editor</span>
                  <span className="px-2 py-0.5 bg-primary/20 rounded-full text-xs font-mono">NEW</span>
                </div>
              </FloatingElement>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 md:mb-8 leading-tight tracking-tight px-2">
              <AnimatedText text="Build Powerful Pipelines" />
              <br />
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="relative inline-block mt-2 md:mt-0"
              >
                <span className="text-gradient-primary">Visually</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  style={{ originX: 0 }}
                />
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Create, connect, and validate complex workflows with our intuitive
              drag-and-drop interface. <span className="text-foreground font-medium">Handle thousands of nodes</span> with
              optimized performance and real-time DAG validation.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full sm:w-auto gap-3 text-lg px-8 py-6 font-semibold" onClick={() => { }}>
                  <Lock className="w-5 h-5" />
                  Privacy
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-3 text-lg px-8 py-6" onClick={() => { }}>
                  <FileText className="w-5 h-5" />
                  Policy
                </Button>
              </motion.div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 px-4"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex items-center gap-2 text-muted-foreground text-sm md:text-base"
                >
                  <benefit.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  <span className="font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>


            {/* Node Types Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {nodeTypes.map((node, index) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 1.3 + index * 0.08,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -8,
                    boxShadow: '0 12px 40px -8px hsl(265 89% 62% / 0.3)',
                  }}
                  className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border cursor-pointer transition-colors hover:border-primary/50"
                >
                  <node.icon className={`w-5 h-5 ${node.color}`} />
                  <span className="font-semibold">{node.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <section className="border-t border-border bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6"
              >
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Features</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                <AnimatedText text="Industry Ready Features" />
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Everything you need to build production-grade pipelines
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -12,
                    boxShadow: '0 24px 48px -12px hsl(230 25% 4% / 0.5)',
                    borderColor: 'hsl(265 89% 62% / 0.5)',
                  }}
                  className="p-6 md:p-8 rounded-2xl bg-card border border-border transition-all group"
                >
                  <motion.div
                    className="p-4 bg-primary/10 rounded-xl w-fit mb-6"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-7 h-7 text-primary" />
                  </motion.div>
                  <h3 className="font-display font-bold text-lg mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-t border-border py-12 md:py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 max-w-5xl mx-auto">
              {[
                { value: '8+', label: 'Node Types' },
                { value: '1000+', label: 'Nodes Supported' },
                { value: '<50ms', label: 'Validation Time' },
                { value: '100%', label: 'DAG Accurate' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="text-center"
                >
                  <motion.div
                    className="text-5xl font-display font-bold text-primary mb-3"
                    style={{ textShadow: '0 0 30px hsl(265 89% 62% / 0.5)' }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border">
          <div className="container mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-block p-5 bg-primary/10 rounded-2xl mb-8"
              >
                <Workflow className="w-10 h-10 text-primary" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to Build Your Pipeline?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Start creating production-ready workflows with our visual editor today.
              </p>

            </motion.div>
          </div>
        </section>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}