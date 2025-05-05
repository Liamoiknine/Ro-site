import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/Layout.css";
import "../styles/index.css"


// Wrapper component for pages. Prepends the Navbar component, and appends the Footer component.
const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">
        <div className="container">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;