"use client";

import Image from "next/image";

export default function GalleryPage() {
  return (
    <div>
      <h2>Cách 1: Dùng &lt;img&gt; thông thường</h2>
      <img src="/images/Hinh1.jpg" alt="Cách 1" />
      <img src="/images/Hinh2.jpg" alt="Cách 1" />

      <h2>Cách 2: Dùng &lt;Image&gt; của Next.js</h2>
      <Image src="/images/Hinh1.jpg" alt="Cách 2" width={600} height={400} />
      <Image src="/images/Hinh2.jpg" alt="Cách 2" width={600} height={400} />
    </div>
  );
}
