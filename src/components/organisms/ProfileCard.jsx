import React, { useRef } from 'react';
import { useProfileStore } from '../../store/useProfileStore';
import { Camera } from 'lucide-react';

const ProfileCard = () => {
    const { name, role, price, profileImage, setProfile } = useProfileStore();
    const fileInputRef = useRef(null);

    const getDominantColor = (imageSrc) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = imageSrc;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 1;
                canvas.height = 1;
                ctx.drawImage(img, 0, 0, 1, 1);
                const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
                const toHex = (c) => {
                    const hex = c.toString(16);
                    return hex.length === 1 ? "0" + hex : hex;
                };
                resolve(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
            };
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const result = reader.result;
                const color = await getDominantColor(result);
                setProfile({ profileImage: result, themeColor: color });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-gray-300 rounded-[32px] p-0 relative overflow-hidden aspect-[4/5] group w-full mb-6">
            <img
                src={profileImage}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div
                className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer z-10"
                onClick={() => fileInputRef.current?.click()}
            >
                <Camera className="text-white drop-shadow-md" size={32} />
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent pointer-events-none"></div>

            <div className="absolute bottom-6 left-6 text-white w-[60%] z-20">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setProfile({ name: e.target.value })}
                    className="text-2xl font-semibold mb-1 bg-transparent border-none outline-none w-full placeholder-gray-400 focus:bg-white/10 rounded px-1 -ml-1 transition-colors"
                    placeholder="Name"
                />
                <input
                    type="text"
                    value={role}
                    onChange={(e) => setProfile({ role: e.target.value })}
                    className="text-gray-200 text-sm font-light bg-transparent border-none outline-none w-full placeholder-gray-400 focus:bg-white/10 rounded px-1 -ml-1 transition-colors"
                    placeholder="Role"
                />
            </div>

            <div className="absolute bottom-6 right-6 z-20">
                <div className="relative">
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setProfile({ price: e.target.value })}
                        className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 text-white text-sm font-medium w-24 text-center outline-none focus:bg-white/30 transition-colors"
                        placeholder="Price"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
