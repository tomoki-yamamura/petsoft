import Image from "next/image";

export default function PetList() {
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      <li>
        <button className="flex w-full h-[70px] items-center cursor-pointer px-5 text-base gap-3 hover:bg-[#eff1f2] focus:hover:bg-[#eff1f2] transition">
          <Image
            src="https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png"
            alt="Pet image"
            width={45}
            height={45}
            className="rounded-full object-cover"
          />
          <p className="font-semibold">Benjamin</p>
        </button>
      </li>
    </ul>
  )
}
