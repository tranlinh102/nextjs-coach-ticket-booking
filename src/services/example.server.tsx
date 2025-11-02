// Example: Sử dụng axios trong Server Component & API Routes
// File này chỉ là ví dụ, KHÔNG import vào project

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api";

// =====================================================
// HELPER: Create axios instance for server-side
// =====================================================
async function createServerAxios() {
  const session = await getServerSession(authOptions);

  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(session?.accessToken && {
        Authorization: `Bearer ${session.accessToken}`,
      }),
    },
  });
}

// =====================================================
// EXAMPLE 1: Server Component - Fetch data server-side
// =====================================================
interface Trip {
  id: string;
  departureLocation: string;
  arrivalLocation: string;
  price: number;
}

export default async function TripsServerPage() {
  // Tạo axios instance với token từ server session
  const api = await createServerAxios();

  try {
    const response = await api.get<Trip[]>("/trips");
    const trips = response.data;

    return (
      <div>
        <h1>Available Trips</h1>
        {trips.map((trip) => (
          <div key={trip.id}>
            {trip.departureLocation} → {trip.arrivalLocation}: ${trip.price}
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch trips:", error);
    return <div>Failed to load trips</div>;
  }
}

// =====================================================
// EXAMPLE 2: Server Component - Protected page
// =====================================================
interface UserProfile {
  id: string;
  name: string;
  email: string;
  bookings: number;
}

export async function ProfileServerPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please login to view your profile</div>;
  }

  const api = await createServerAxios();

  try {
    const response = await api.get<UserProfile>("/user/profile");
    const profile = response.data;

    return (
      <div>
        <h1>Your Profile</h1>
        <p>Name: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <p>Total Bookings: {profile.bookings}</p>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return <div>Failed to load profile</div>;
  }
}

// =====================================================
// EXAMPLE 3: API Route - GET request
// =====================================================
import { NextRequest, NextResponse } from "next/server";

export async function GET_trips_api(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Call backend API với access token
    const response = await axios.get(`${API_BASE_URL}/trips`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Backend API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 }
    );
  }
}

// =====================================================
// EXAMPLE 4: API Route - POST request (Create booking)
// =====================================================
export async function POST_booking_api(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Call backend API
    const response = await axios.post(
      `${API_BASE_URL}/bookings`,
      body,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error("Failed to create booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

// =====================================================
// EXAMPLE 5: API Route - Proxy to backend with params
// =====================================================
export async function GET_search_api(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");

  try {
    const response = await axios.get(`${API_BASE_URL}/trips/search`, {
      params: { from, to, date },
      headers: {
        ...(session?.accessToken && {
          Authorization: `Bearer ${session.accessToken}`,
        }),
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}

// =====================================================
// EXAMPLE 6: API Route - Handle errors properly
// =====================================================
import { AxiosError } from "axios";

export async function GET_with_error_handling(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      // Backend API returned error
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "API Error";

      return NextResponse.json(
        {
          error: message,
          code: error.response?.data?.code,
        },
        { status }
      );
    }

    // Network error or other errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// =====================================================
// EXAMPLE 7: Server Action - Form submission
// =====================================================
"use server";

export async function createBookingAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/bookings`,
      {
        tripId: formData.get("tripId"),
        seatNumbers: [formData.get("seat")],
        passengerName: formData.get("name"),
        passengerPhone: formData.get("phone"),
      },
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Booking creation failed:", error);
    return {
      success: false,
      error: "Failed to create booking",
    };
  }
}
