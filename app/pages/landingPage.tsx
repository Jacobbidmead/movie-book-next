const LandingPage: React.FC = () => {
  return (
    <>
      <div className="h-[500px] flex place-items-center justify-center flex-col ">
        <div className="text-6xl">Movie Book AI.</div>
        <div>
          Welcome to movie book AI, the movie recommendation site that helps you
          choose what to watch.
        </div>
        <div>
          Search for youre favourite movies & tv shows, add the to your list,
          then hit the get recommendations button
        </div>
        <div>
          The AI langauge model will give you recommendations based on youre
          choices
        </div>
        <div>Use as a guest or create an account to interact with friends!</div>
      </div>
    </>
  );
};

export default LandingPage;
