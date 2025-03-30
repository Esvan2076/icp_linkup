const Footer = () => {
    return (
       <footer class="footer sm:footer-horizontal bg-primary text-neutral-content py-10 px-24">
          <aside>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="1.5">
                <path d="M9 15l6 -6"></path>
                <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"></path>
                <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"></path>
             </svg>
             <p>
                LinkUp
             </p>
          </aside>
          <nav>
             <h6 class="footer-title">Services</h6>
             <a class="link link-hover">Branding</a>
          </nav>
          <nav>
             <h6 class="footer-title">Company</h6>
             <a class="link link-hover">About us</a>
          </nav>
          <nav>
             <h6 class="footer-title">Legal</h6>
             <a class="link link-hover">Terms of use</a>
          </nav>
       </footer>
 
    );
 };
 
 export default Footer;