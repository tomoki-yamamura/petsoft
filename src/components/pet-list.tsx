import { usePetContext } from "@/lib/hooks";
import { Pet } from "@/lib/types";
import Image from "next/image";

export default function PetList() {
  const { pets } = usePetContext();
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {pets.map(pet => (
        <li key={pet.id}>
          <button className="flex w-full h-[70px] items-center cursor-pointer px-5 text-base gap-3 hover:bg-[#eff1f2] focus:hover:bg-[#eff1f2] transition">
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}

    </ul>
  )
}
