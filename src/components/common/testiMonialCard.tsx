type TestimonialObj = {
  profile: string;
  name: string;
  username: string;
  description: string;
};

export  const CardWrapper = ({ profile, name, username, description }: TestimonialObj) => {
  return (
    <div className="rounded-[12px] border border-[#E1E8ED] bg-white p-5 aspect-[5/3] w-full">
      <div className="flex items-start space-x-4">
        <img
          src={profile}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
            
          <h2 className="font-semibold text-black text-left xl:text-sm xs:text-xs leading-tight">{name}</h2>
          <p className="text-[rgba(0,0,0,0.55)] xl:text-sm xs:text-xs">@{username}</p>
        </div>
      </div>
      <p className="mt-3 text-[#212123] text-left xl:text-sm xs:text-xs leading-relaxed">
        {description}
      </p>
    </div>
  );
};
