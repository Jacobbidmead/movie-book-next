"use client";

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="h-screen flex place-items-center justify-center flex-col">
        <div className="text-8xl pb-16 text-primary">MediaBook AI.</div>
        <div className=" flex gap-4 flex-col text-sm text-light w-5/12">
          <p>
            Welcome to MediaBook AI, the media recommendation site that helps
            you choose what to watch.
          </p>
          <p className="">
            Search for youre favourite movies & tv shows, add the to your list,
            then hit the get recommendations button
          </p>
          <p>
            The AI langauge model will give you recommendations based on youre
            choices
          </p>
          <p>Use as a guest or create an account to interact with friends!</p>
          <button className="p-2 border-border border-button rounded-button w-1/3">
            Click here to get started
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
