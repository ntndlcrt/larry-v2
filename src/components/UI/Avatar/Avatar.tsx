export default function Avatar({ src }: { src: string | undefined }) {
    return (
        <div className="w-full h-full rounded-[50%] relative overflow-hidden border border-black">
            <img
                src={src}
                alt=""
                className="object-center object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    )
}
