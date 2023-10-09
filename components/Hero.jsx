import GoToAppBtn from './GoToAppBtn';

const Hero = () => {
  return (
    <section className="min-h-screen grid place-content-center">
      <div className="max-w-sm">
        <div className="flex items-center mb-14">
          <button className="alabaster-btn mr-4">Buy labels</button>
          <GoToAppBtn />
        </div>

        <h1 className="font-sans uppercase font-bold text-coral text-6xl mb-2">
          readybook
        </h1>
        <p className="pl-1 text-lg leading-6">
          Connecting home libraries to make it easier keep track of and borrow
          books from each other.
        </p>
      </div>
    </section>
  );
};

export default Hero;
