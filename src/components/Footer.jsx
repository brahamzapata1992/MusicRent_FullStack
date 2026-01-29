import logo from '../assets/img_header/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-4">
          <img src={logo} alt="Music Rent" className="h-8 w-auto" />
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Copyright. Music Rent
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
