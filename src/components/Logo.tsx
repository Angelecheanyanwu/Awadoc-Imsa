import Image from "next/image";

export default function Logo({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <Image
      src="/awadoc-logo.png"
      alt="AwaDoc"
      width={3641}
      height={924}
      priority
      className={className}
    />
  );
}
