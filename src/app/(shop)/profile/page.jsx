"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import ProfileForm from "@/components/shared/ProfileForm";
import { userService } from "@/services/user.service";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await userService.getProfile();

      setProfile(data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <ProfileForm profile={profile} setProfile={setProfile} />
    </div>
  );
}
