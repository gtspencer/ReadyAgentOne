import React from 'react';
import { MouseParallaxContainer, MouseParallaxChild } from 'react-parallax-mouse';
import { motion } from 'framer-motion';
import { Bot, Code2 } from 'lucide-react';

import imgUrl from './agent.png'
import backgroundUrl from './nifty.png'

function App() {
  const parallaxClose = 0.01;
  const parallaxMid = 0.015;
  const parallaxFar = 0.02;
  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#1d1d1f] relative">

      <div className="absolute inset-0">
        <img
          src={backgroundUrl}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-gray-900" />
      </div>

      <MouseParallaxContainer className="min-h-screen relative overflow-hidden">
        <div className="px-4 py-12 w-5/6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >

            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              ReadyAgentOne
            </h1>

            <h2 className="text-xl text-gray-500 dark:text-gray-400">
              <a href="https://ethglobal.com/showcase/gaimer-7mytn" target="_blank" rel="noopener noreferrer">
                [Agentic Hackathon 2025]
              </a>
            </h2>

          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8 lg:col-span-2"
            >
              <MouseParallaxChild factorX={parallaxClose} factorY={parallaxFar} className="relative -translate-y-6 left-10">
                <div className="relative">
                  <label className="flex items-center text-lg mb-3 text-gray-800 dark:text-white">
                    <Bot className="mr-2" /> Agent Status
                  </label>
                  <div className="rounded-2xl p-6 bg-white dark:bg-[#2d2d2f] shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Agent initialized and running in autonomous mode. Current objectives: analyze market trends,
                      optimize trading strategies, and maintain portfolio balance. Neural pathways are operating
                      at 94% efficiency. Memory allocation: 72% available.
                    </p>
                  </div>
                </div>
              </MouseParallaxChild>

              <MouseParallaxChild factorX={parallaxMid} factorY={parallaxMid} className="relative translate-y-6 right-10">
                <div className="relative">
                  <label className="flex items-center text-lg mb-3 text-gray-800 dark:text-white">
                    <Code2 className="mr-2" /> Framework Parameters
                  </label>
                  <div className="rounded-2xl p-6 bg-white dark:bg-[#2d2d2f] shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Framework v2.5.0 active with enhanced decision matrices. Risk tolerance: moderate.
                      Trading pairs: BTC/USD, ETH/USD, SOL/USD. Automated position management enabled.
                      Maximum drawdown limit: 12%. Current market sentiment analysis: bullish.
                    </p>
                  </div>
                </div>
              </MouseParallaxChild>

              <MouseParallaxChild factorX={parallaxClose} factorY={parallaxMid} className="relative translate-y-6">
                <div className="relative">
                  <label className="flex items-center text-lg mb-3 text-gray-800 dark:text-white">
                    <Code2 className="mr-2" /> Powered by
                  </label>
                  <div className="rounded-2xl p-6 bg-white dark:bg-[#2d2d2f] shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Framework v2.5.0 active with enhanced decision matrices. Risk tolerance: moderate.
                      Trading pairs: BTC/USD, ETH/USD, SOL/USD. Automated position management enabled.
                      Maximum drawdown limit: 12%. Current market sentiment analysis: bullish.
                    </p>
                  </div>
                </div>
              </MouseParallaxChild>
            </motion.div>

            {/* Empty middle column for spacing */}
            <div className="lg:col-span-1" />

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <MouseParallaxChild factorX={parallaxClose} factorY={parallaxClose} className="relative -translate-y-6">
                <div className="rounded-2xl p-6 bg-white dark:bg-[#2d2d2f] shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] h-[600px] overflow-y-auto">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Thought Stream</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl p-4 bg-gray-50 dark:bg-[#3d3d3f]"
                      >
                        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-600 dark:text-gray-300">
                          {`[${new Date().toISOString()}] Analyzing market conditions...
Market volatility index: 23.5
Support level identified at $42,850
Resistance zone detected between $44,200 - $44,500
Initiating position scaling strategy...`}
                        </pre>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </MouseParallaxChild>
            </motion.div>
          </div>
        </div>
      </MouseParallaxContainer>

      {/* Agent image positioned globally */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 inset-x-0 flex justify-center pointer-events-none z-10"
      >
        <img
          src={imgUrl}
          alt="Agent Character"
          className="h-[65vh] w-auto object-contain filter drop-shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        />
      </motion.div>
      {/* Background image with gradient overlay */}

    </div>
  );
}

export default App;