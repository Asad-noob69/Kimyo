import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
        {/* Top Left Image */}
        <div className="bg-gray-100 aspect-video rounded-lg shadow-md"></div>
        
        {/* Top Right Image */}
        <div className="bg-gray-100 aspect-square rounded-lg shadow-md"></div>
        
        {/* Center Circle - Spans both columns on mobile */}
        <div className="relative md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                        w-24 h-24 mx-auto rounded-full bg-white shadow-lg border-2 border-gray-200
                        flex items-center justify-center z-10">
          <div className="w-16 h-16 rounded-full bg-gray-200"></div>
        </div>
        
        {/* Bottom Left Image */}
        <div className="bg-gray-100 aspect-square rounded-lg shadow-md"></div>
        
        {/* Bottom Right Image */}
        <div className="bg-gray-100 aspect-video rounded-lg shadow-md"></div>
        
        {/* Shopping Bag Preview - Full width on mobile */}
        <div className="col-span-1 md:col-span-2 bg-gray-100 aspect-video rounded-lg shadow-md mt-4"></div>
      </div>
    </main>
  );
}
