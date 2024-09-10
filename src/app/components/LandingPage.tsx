'use client';

import { motion, useAnimation } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

const Logo = ({ className = "" }) => {
  return (
    <svg className={`w-20 h-20 ${className}`} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#4F46E5" />
      <path d="M30 70 L50 30 L70 70 Z" fill="white" />
      <circle cx="50" cy="55" r="5" fill="#4F46E5" />
    </svg>
  )
}

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#4F46E5" />
    </mesh>
  )
}

function BackgroundPattern() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-800 opacity-80" />
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />
    </div>
  )
}

export default function LandingPage() {
  const controls = useAnimation()
  const [canvasLoaded, setCanvasLoaded] = useState(false)

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 }
    }))
    setCanvasLoaded(true)
  }, [controls])

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
        }
        
        .logo-font {
          font-family: 'Poppins', sans-serif;
          letter-spacing: 0.05em;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
        }
      `}</style>

      <BackgroundPattern />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Logo className="mb-4" />
            <h1 className="text-5xl md:text-7xl font-bold text-center text-white logo-font">
              ΚΑΤΑΛΥΤΙΚΑ
            </h1>
          </motion.div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-16 relative"
          >
            <div className="absolute inset-0 z-0" style={{ height: '400px' }}>
              {canvasLoaded && (
                <Canvas>
                  <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <RotatingCube />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
              )}
            </div>
            <div className="relative z-10 pt-40">
              <h2 className="text-4xl md:text-5xl font-semibold mb-4">Εξυπηρετούμε. Ρυθμίζουμε.</h2>
              <p className="text-xl mb-8 text-indigo-200">Το εξειδικευμένο δικηγορικό γραφείο για τη ρύθμιση οφειλών.</p>
              <motion.a
                href="tel:6982284087"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-indigo-800 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-100 transition duration-300"
              >
                Ξεκινήστε τώρα <Phone className="inline-block ml-2 w-5 h-5" />
              </motion.a>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 mb-16"
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold mb-4">Σχετικά με εμάς</h3>
              <p className="mb-4 text-indigo-200">Στην ΚΑΤΑΛΥΤΙΚΑ, η αποστολή μας είναι να παρέχουμε εξαιρετικές νομικές υπηρεσίες για την ρύθμιση οφειλών. Προσαρμόζουμε τις υπηρεσίες μας στις ατομικές ανάγκες κάθε πελάτη, διασφαλίζοντας έτσι την πιο αποτελεσματική ρύθμιση οφειλών.</p>
              <p className="text-indigo-200">Επιλέγοντας την ΚΑΤΑΛΥΤΙΚΑ, επιλέγετε απόλυτη γνώση, αξιοπιστία και αφοσίωση στο να αντιμετωπίσετε την οικονομική σας κατάσταση.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Phone, text: "Επαγγελματισμός" },
                { icon: Mail, text: "Ενημέρωση νομοθεσίας" },
                { icon: MapPin, text: "Προστασία Πελατών" },
                { icon: Phone, text: "Επικοινωνία 24/7" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card p-6 flex flex-col items-center text-center"
                >
                  <item.icon className="w-10 h-10 text-indigo-300 mb-4" />
                  <p className="font-medium text-lg">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-semibold mb-8">Επικοινωνήστε μαζί μας</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.div whileHover={{ scale: 1.05 }} className="glass-card p-6 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-indigo-300 mr-4" />
                <p className="text-lg">Γεροκωστοπούλου 22, Πάτρα</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="glass-card p-6 flex items-center justify-center">
                <Phone className="w-8 h-8 text-indigo-300 mr-4" />
                <p className="text-lg">2610 223332</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="glass-card p-6 flex items-center justify-center">
                <Phone className="w-8 h-8 text-indigo-300 mr-4" />
                <p className="text-lg">69 8228 4087</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="glass-card p-6 flex items-center justify-center">
                <Mail className="w-8 h-8 text-indigo-300 mr-4" />
                <p className="text-lg">info@katalytika.gr</p>
              </motion.div>
            </div>
          </motion.section>
        </main>

        <footer className="bg-indigo-900 bg-opacity-50 backdrop-blur-sm text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2023 ΚΑΤΑΛΥΤΙΚΑ. Όλα τα δικαιώματα διατηρούνται.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}