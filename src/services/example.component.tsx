// Example: Sử dụng axios trong React Component
// File này chỉ là ví dụ, KHÔNG import vào project

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axiosInstance from "@/lib/axios";

// =====================================================
// EXAMPLE 1: Client Component - Fetch data on mount
// =====================================================
interface Trip {
  id: string;
  departureLocation: string;
  arrivalLocation: string;
  price: number;
}

export function TripListExample() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrips() {
      try {
        setLoading(true);
        const response = await axiosInstance.get<Trip[]>("/trips");
        setTrips(response.data);
      } catch (err) {
        setError("Failed to fetch trips");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrips();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {trips.map((trip) => (
        <div key={trip.id}>
          {trip.departureLocation} → {trip.arrivalLocation}: ${trip.price}
        </div>
      ))}
    </div>
  );
}

// =====================================================
// EXAMPLE 2: Form Submit - Create booking
// =====================================================
export function BookingFormExample() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setLoading(true);
      const response = await axiosInstance.post("/bookings", {
        tripId: formData.get("tripId"),
        seatNumbers: [formData.get("seat")],
        passengerName: formData.get("name"),
        passengerPhone: formData.get("phone"),
      });

      alert(`Booking created: ${response.data.bookingCode}`);
    } catch (error) {
      alert("Failed to create booking");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="tripId" placeholder="Trip ID" required />
      <input name="seat" placeholder="Seat Number" required />
      <input name="name" placeholder="Name" required />
      <input name="phone" placeholder="Phone" required />
      <button type="submit" disabled={loading}>
        {loading ? "Booking..." : "Book Now"}
      </button>
    </form>
  );
}

// =====================================================
// EXAMPLE 3: Button Click - Delete action
// =====================================================
export function DeleteBookingButtonExample({ bookingId }: { bookingId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure?")) return;

    try {
      setLoading(true);
      await axiosInstance.delete(`/bookings/${bookingId}`);
      alert("Booking cancelled successfully");
      // Refresh data or redirect
    } catch (error) {
      alert("Failed to cancel booking");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
}

// =====================================================
// EXAMPLE 4: Search with debounce
// =====================================================
import { useCallback } from "react";

export function SearchTripsExample() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Trip[]>([]);
  const [searching, setSearching] = useState(false);

  const searchTrips = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    try {
      setSearching(true);
      const response = await axiosInstance.get<Trip[]>("/trips/search", {
        params: { q: searchQuery },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchTrips(query);
    }, 500); // Debounce 500ms

    return () => clearTimeout(timer);
  }, [query, searchTrips]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search trips..."
      />
      {searching && <div>Searching...</div>}
      <div>
        {results.map((trip) => (
          <div key={trip.id}>{trip.departureLocation}</div>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// EXAMPLE 5: Protected Component - Check auth before call
// =====================================================
export function ProtectedDataExample() {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Chỉ fetch khi đã authenticated
    if (status === "authenticated") {
      axiosInstance
        .get("/user/profile")
        .then((res) => setData(res.data))
        .catch((err) => console.error(err));
    }
  }, [status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Please login</div>;

  return <div>{data ? JSON.stringify(data) : "Loading profile..."}</div>;
}

// =====================================================
// EXAMPLE 6: File Upload with Progress
// =====================================================
export function FileUploadExample() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percentCompleted);
        },
      });

      alert(`Upload successful: ${response.data.url}`);
    } catch (error) {
      alert("Upload failed");
      console.error(error);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  return (
    <div>
      <input type="file" onChange={handleFileUpload} disabled={uploading} />
      {uploading && <div>Uploading: {progress}%</div>}
    </div>
  );
}
