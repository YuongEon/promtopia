"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter()
  useEffect(() => {
    const fetchUsersPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) fetchUsersPosts();
  }, []);

  console.log(posts);

  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async (post) => {
    const hasConfirm = confirm("Are u sure to delete this prompt?")
    if(hasConfirm){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE"
        })

        const filteredPosts = posts.filter((p) => {
          p._id !== post._id
        })

        setPosts(filteredPosts)
      } catch (error) {
        
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
