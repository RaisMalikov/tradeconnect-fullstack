import React from 'react';

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-20 max-w-3xl text-center">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-900">Get in Touch</h1>
      <p className="text-xl text-gray-600 mb-10">
        Have questions about TradieConnects? We're here to help you get the job done.
      </p>
      
      <div className="bg-slate-50 p-10 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">Email Support</h2>
        <p className="text-slate-600 mb-6">
          For account support, feedback, or general inquiries, drop us a line at:
        </p>
        <a 
          href="mailto:info@tradieconnects.co.nz" 
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-4 transition-all"
        >
          info@tradieconnects.co.nz
        </a>
      </div>
      
      <div className="mt-12 text-sm text-slate-500">
        <p>Based in New Zealand. We usually respond within 24 hours.</p>
      </div>
    </main>
  );
}