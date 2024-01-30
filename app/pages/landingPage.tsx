"use client";

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="h-screen flex place-items-center justify-center flex-col">
        <div className="text-8xl p-6 text-primary">Movie Book AI.</div>
        <div className="text-center flex gap-2 flex-col text-sm text-white w-86">
          <p>
            Welcome to movie book AI, the movie recommendation site that helps
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
          <button>Click here to get started</button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
