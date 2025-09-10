'use client';

import { Booking, Provider } from '@/lib/supabase';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Review {
  id: number;
  rating: number;
  text: string;
  author: string;
  date: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    rating: 4,
    text: 'Amazing service! My house has never been cleaner. Professional and trustworthy.',
    author: 'Sarah M.',
    date: '2024-02-15',
  },
  {
    id: 2,
    rating: 5,
    text: 'Great service! Always on time and does excellent work. Highly recommended.',
    author: 'Jennifer K.',
    date: '2024-02-10',
  },
  {
    id: 3,
    rating: 5,
    text: 'Very thorough cleaning and friendly staff. Will book again!',
    author: 'Michael R.',
    date: '2024-02-05',
  },
];

export default function ProviderProfile() {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState<string>('');
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'original'>(
    'original'
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetchProvider();
  }, []);

  async function fetchProvider() {
    try {
      // Dynamic import to avoid SSR issues
      const { supabase } = await import('@/lib/supabase');

      // Check if Supabase is properly configured
      if (supabase) {
        const { data, error } = await supabase
          .from('providers')
          .select('*')
          .eq('id', 1)
          .single();

        if (!error && data) {
          setProvider(data);
          return;
        } else {
          console.error('Error fetching provider:', error);
        }
      }

      // Use mock data if Supabase is not configured or fails
      setProvider({
        id: 1,
        name: 'Maria Rodriguez',
        bio: 'MOCK  Professional house cleaner with 8+ years experience. Trusted by 200+ families for deep cleaning, weekly maintenance, and move-in/out services. Eco-friendly products and satisfaction guaranteed.',
        rating: 5,
      });
    } catch (error) {
      console.error('Connection error:', error);
      // Use mock data if connection fails
      setProvider({
        id: 1,
        name: 'Maria Rodriguez',
        bio: 'MOCK Professional house cleaner with 8+ years experience. Trusted by 200+ families for deep cleaning, weekly maintenance, and move-in/out services. Eco-friendly products and satisfaction guaranteed.',
        rating: 5,
      });
    } finally {
      setLoading(false);
    }
  }

  function sortReviewsByRating() {
    let sorted: Review[];
    let newSortOrder: 'asc' | 'desc' | 'original';

    if (sortOrder === 'original') {
      // Sort by highest rating first
      sorted = [...reviews].sort((a, b) => b.rating - a.rating);
      newSortOrder = 'desc';
    } else if (sortOrder === 'desc') {
      // Sort by lowest rating first
      sorted = [...reviews].sort((a, b) => a.rating - b.rating);
      newSortOrder = 'asc';
    } else {
      // Reset to original order
      sorted = [...mockReviews];
      newSortOrder = 'original';
    }

    setReviews(sorted);
    setSortOrder(newSortOrder);
  }

  async function handleBooking() {
    if (!provider) return;

    setIsBookingLoading(true);
    try {
      // Dynamic import to avoid SSR issues
      const { supabase } = await import('@/lib/supabase');

      if (supabase) {
        const booking: Partial<Booking> = {
          provider_id: provider.id,
          timestamp: new Date().toISOString(),
        };

        const { error } = await supabase.from('bookings').insert([booking]);

        if (!error) {
          setBookingStatus('Booking Saved!');
        } else {
          console.error('Error creating booking:', error);
          setBookingStatus('Booking Saved! (Mock - Supabase error)');
        }
      } else {
        // Supabase not configured, use mock response
        setBookingStatus('Booking Saved! (Mock - No Supabase connection)');
      }
    } catch (error) {
      console.error('Connection error:', error);
      setBookingStatus('Booking Saved! (Mock - Connection error)');
    } finally {
      setIsBookingLoading(false);
      setTimeout(() => setBookingStatus(''), 3000);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crisp-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-teal mx-auto mb-4"></div>
          <p className="text-slate-gray">Loading provider...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-crisp-white py-4 px-4 sm:py-8">
      <div className="max-w-profile mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="font-poppins text-3xl font-bold text-soft-teal mb-2">
            Licking Clean
          </h1>
          <h2 className="font-poppins text-xl text-soft-teal mb-2">
            Professional Cleaning Services
          </h2>
          <p className="text-body text-slate-gray">
            Top-Rated • Trusted • Reliable
          </p>
        </header>

        {/* Provider Profile Section */}
        <section>
          <h3 className="font-poppins text-2xl font-bold text-soft-teal mb-4 text-center">
            Meet Your Cleaning Professional
          </h3>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
              {/* Provider Photo */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src="/api/placeholder/128/128"
                  alt={`${provider?.name} - Professional Cleaner`}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  priority
                  onError={(e) => {
                    // Fallback to a placeholder div if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                    <div class="w-full h-full bg-soft-teal flex items-center justify-center text-white font-poppins text-2xl">
                      ${
                        provider?.name
                          ?.split(' ')
                          .map((n) => n[0])
                          .join('') || 'MC'
                      }
                    </div>
                  `;
                  }}
                />
              </div>

              {/* Provider Details */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                  <h2 className="font-poppins text-heading text-slate-gray">
                    {provider?.name}
                  </h2>
                  <span className="inline-block bg-golden-beige text-slate-gray px-3 py-1 rounded-full text-xs font-semibold">
                    ⭐ Top-Rated
                  </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < (provider?.rating || 5)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-body text-slate-gray ml-2">
                    {provider?.rating}/5 stars
                  </span>
                </div>

                <p className="text-body text-slate-gray leading-relaxed">
                  {provider?.bio}
                </p>
              </div>
            </div>

            {/* Book Now Button */}
            <div className="text-center">
              <button
                onClick={handleBooking}
                disabled={isBookingLoading}
                className="bg-warm-coral hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                aria-label="Book cleaning service with this provider"
              >
                {isBookingLoading ? 'Booking...' : 'Book Now'}
              </button>
              {bookingStatus && (
                <p className="text-sm text-green-600 mt-2 font-semibold">
                  {bookingStatus}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h3 className="font-poppins text-2xl font-bold text-soft-teal">
                What Our Customers Say
              </h3>
              <button
                onClick={sortReviewsByRating}
                className="bg-soft-teal hover:bg-opacity-90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 w-full sm:w-auto"
                aria-label={`Sort reviews ${
                  sortOrder === 'original'
                    ? 'by highest rating first'
                    : sortOrder === 'desc'
                    ? 'by lowest rating first'
                    : 'to original order'
                }`}
              >
                {sortOrder === 'original' && '↓ Sort by Highest Rating'}
                {sortOrder === 'desc' && '↑ Sort by Lowest Rating'}
                {sortOrder === 'asc' && '⟲ Reset to Original Order'}
              </button>
            </div>

            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-100 pb-4 last:border-b-0"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < review.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-slate-gray font-medium">
                      {review.author}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-body text-slate-gray">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-8 py-4">
          <p className="text-sm text-gray-400">
            © 2024 Licking Clean. Professional cleaning services you can trust.
          </p>
        </footer>
      </div>
    </div>
  );
}
