export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-300 p-4 text-base-content">
      <p>
        &copy; {new Date().getFullYear()}{" "}
        <a className="link" href="https://darrickdevelops.com">
          Darrick Develops
        </a>
      </p>
    </footer>
  );
}
