'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Trash2, Plus, Minus, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function CheckoutPage() {
  const { items, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  
  const [form, setForm] = useState({ phone: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.user) setUser(data.user);
        setLoadingUser(false);
      })
      .catch(() => setLoadingUser(false));
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (!user) {
        throw new Error('Debes iniciar sesión para comprar.');
      }
      
      const payload = {
        items: items.map(i => ({ productId: i.productId, quantity: i.quantity, price: i.price })),
        phone: form.phone,
        notes: form.notes,
        total: cartTotal
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Error procesando tu pedido.');
      }

      setSuccess(true);
      clearCart();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#050012] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050012] via-[#0b0430] to-[#120046] text-white">
      <Header />
      
      <main className="container mx-auto px-5 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          
          <h1 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Finalizar Compra
          </h1>

          {success ? (
            <Card className="bg-white/5 border-green-500/30 p-8 md:p-12 text-center shadow-2xl shadow-green-500/10">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">¡Pedido Confirmado!</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                Tu orden ha sido registrada con éxito. Nos pondremos en contacto contigo muy pronto para la entrega y detalles finales.
              </p>
              <Link href="/usuario/pedidos">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-6 text-lg rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25">
                  Ver mis pedidos <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Cart Items Section */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">Tu Carrito ({items.length})</h2>
                  {items.length > 0 && (
                    <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-300 transition-colors">
                      Vaciar carrito
                    </button>
                  )}
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-gray-400 text-lg mb-6">Tu carrito está vacío.</p>
                    <Link href="/servicios">
                      <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-6">
                        Explorar Servicios
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map(item => (
                      <div key={item.productId} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 items-center transition-all hover:bg-white/10">
                        <div className="w-20 h-20 bg-gray-800 rounded-xl overflow-hidden shrink-0 flex items-center justify-center text-3xl">
                          📦
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-lg text-white truncate">{item.name}</h4>
                          <p className="text-sm text-gray-400">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/10">
                            <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="p-1.5 hover:bg-white/10 rounded-md transition-colors">
                              <Minus className="w-4 h-4 text-gray-300" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="p-1.5 hover:bg-white/10 rounded-md transition-colors">
                              <Plus className="w-4 h-4 text-gray-300" />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.productId)} className="p-2 text-gray-500 hover:text-red-400 transition-colors hover:bg-red-400/10 rounded-xl">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Checkout Form Section */}
              <div className="lg:col-span-5">
                <Card className="bg-white/5 border-white/10 p-6 shadow-2xl sticky top-28">
                  <h3 className="text-xl font-bold text-white mb-6">Resumen del Pedido</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Envío</span>
                      <span className="text-green-400">Gratis</span>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                      <span className="text-lg font-medium text-white">Total</span>
                      <span className="text-2xl font-bold text-white">
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(cartTotal)}
                      </span>
                    </div>
                  </div>

                  {items.length > 0 && (
                    <form onSubmit={handleCheckout} className="space-y-5">
                      {!user ? (
                        <div className="p-4 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-center">
                          <p className="text-indigo-200 mb-4 text-sm">Debes iniciar sesión para completar tu compra y rastrear tus pedidos.</p>
                          <Link href="/">
                            <Button type="button" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                              Iniciar Sesión
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <>
                          <div className="p-3 bg-white/5 border border-white/10 rounded-xl mb-6">
                            <p className="text-xs text-gray-400 mb-1">Comprando como:</p>
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Teléfono de contacto</label>
                            <input
                              type="tel"
                              required
                              value={form.phone}
                              onChange={e => setForm({ ...form, phone: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                              placeholder="+57 300 000 0000"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1.5">Notas del pedido (Opcional)</label>
                            <textarea
                              value={form.notes}
                              onChange={e => setForm({ ...form, notes: e.target.value })}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors h-24 resize-none"
                              placeholder="Instrucciones especiales, detalles del diseño..."
                            />
                          </div>

                          {error && (
                            <p className="text-red-400 text-sm">{error}</p>
                          )}

                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl py-6 text-lg shadow-lg hover:shadow-indigo-500/25 transition-all mt-6"
                          >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirmar y Pagar'}
                          </Button>
                          
                          <p className="text-center text-xs text-gray-500 mt-4">
                            Tus datos personales se utilizarán para procesar tu pedido y brindarte soporte.
                          </p>
                        </>
                      )}
                    </form>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
